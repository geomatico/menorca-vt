import ReactDOM from 'react-dom';
import React, {useEffect, useState} from 'react';
import {debounce} from 'throttle-debounce';
import clsx from 'clsx';

import {ThemeProvider, makeStyles} from '@material-ui/core/styles';
import {CssBaseline, Typography, IconButton} from '@material-ui/core';

import FilterListIcon from '@material-ui/icons/FilterList';

import {BaseMapPicker, CategoricFilter, Map, RangeSlider} from 'geocomponents';

import theme from './theme';
import config from './config.json';
import SectionTitle from './components/SectionTitle';
import ResponsiveHeader from './components/ResponsiveHeader';
import ResponsiveDrawer from './components/ResponsiveDrawer';

const {mapStyles, sourceLayers, categories, fallbackColor, minDate, initialViewport} = config;

const drawerWidth = 360;

const useStyles = makeStyles((theme) => ({
  contentWithoutDrawer: {
    flexGrow: 1,
    padding: 0,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
  },
  contentWithDrawer: {
    right: drawerWidth,
    [theme.breakpoints.down('sm')]: {
      right: 0,
    },
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
  },
  filterIcon: {
    color: theme.palette.primary.contrastText
  }
}));

const auth = [{
  urlMatch: process.env.EXPEDIENTS_LAYER,
  user: process.env.EXPEDIENTS_USER,
  password: process.env.EXPEDIENTS_PASSWORD
}];

const maxDate = new Date().getFullYear();

const sources = {
  'expedients': {
    'type': 'vector',
    'tiles': [
      `https://${process.env.TILE_HOST}/geoserver/ordenacio_restringit/wms?service=WMS&version=1.1.0&request=GetMap&layers=${process.env.EXPEDIENTS_LAYER}&bbox={bbox-epsg-3857}&width=512&height=512&srs=EPSG:3857&styles=&format=application/vnd.mapbox-vector-tile`
    ],
    'minzoom': 9,
    'maxzoom': 15
  }
};

const buildLayers = (selectedCategories, dateRange) => sourceLayers.map(sourceLayer => ({
  'id': sourceLayer,
  'type': 'circle',
  'source': 'expedients',
  'source-layer': sourceLayer,
  'filter': ['all',
    ['in',
      ['get', 'tipus'],
      ['literal', categories.filter(({id}) => selectedCategories.includes(id)).flatMap(({values}) => values)]
    ],
    ['>=',
      ['get', 'any'],
      dateRange[0]
    ],
    ['<=',
      ['get', 'any'],
      dateRange[1]
    ]
  ],
  'paint': {
    'circle-color': ['match', ['get', 'tipus'],
      ...categories.flatMap(({values, color}) =>
        values.flatMap(value => [value, color])
      ),
      fallbackColor
    ],
    'circle-radius': ['interpolate', ['linear'], ['zoom'],
      10, 1.5,
      13, 2,
      19, 8
    ],
    'circle-opacity': ['interpolate', ['linear'], ['zoom'],
      9, 0.33,
      17, 0.9
    ],
  }
}));

const App = () => {
  const [viewport, setViewport] = useState(initialViewport);

  const [selectedStyleUrl, setSelectedStyleUrl] = useState('https://geoserveis.icgc.cat/contextmaps/fulldark.json');

  const [selectedCategories, setSelectedCategories] = useState(categories.map(({id}) => id));

  const [dateRange, setDateRange] = useState([minDate, maxDate]);

  const [layers, setLayers] = useState(buildLayers(selectedCategories, dateRange));

  const [data, setData] = useState({
    typeCountByYear: [],
    resolutionStateCount: []
  });

  useEffect(() => {
    setLayers(buildLayers(selectedCategories, dateRange));
  }, [selectedCategories, dateRange]);

  const onViewportChange = ({latitude, longitude, zoom, bearing, pitch}) => setViewport({
    latitude,
    longitude,
    zoom,
    bearing,
    pitch,
  });

  const calcStats = debounce(10, (map) => {
    const featureProperties = map
      .queryRenderedFeatures({
        layers: sourceLayers
      })
      .map(feature => feature.properties)
      .filter(({any}) => any >= dateRange[0] && any <= dateRange[1]);

    const objTypeCountByYear = featureProperties
      .reduce((stats, properties) => {
        const year = properties.any;
        const type = properties.tipus;

        stats[year] = stats[year] || {};
        stats[year][type] = stats[year][type] ? stats[year][type] + 1 : 1;
        return stats;
      }, {});

    const arrTypeCountByYear = Object.keys(objTypeCountByYear)
      .reduce((data, year) => {
        data.push({
          year: year,
          ...objTypeCountByYear[year]
        });
        return data;
      }, []);

    const objResolutionStateCount = featureProperties
      .map(properties => properties.resolucio)
      .reduce((stats, resolucio) => {
        stats[resolucio] = stats[resolucio] ? stats[resolucio] + 1 : 1;
        return stats;
      }, {});

    const arrResolutionStateCount = Object.entries(objResolutionStateCount)
      .reduce((data, [resolucio, count]) => {
        data.push({
          name: resolucio,
          value: count
        });
        return data;
      }, []);

    setData({
      typeCountByYear: arrTypeCountByYear,
      resolutionStateCount: arrResolutionStateCount
    });
  });

  const onMapSet = (map) => {
    map.on('idle', () => {
      calcStats(map);
    });
  };

  const classes = useStyles();

  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => setDrawerOpen(!isDrawerOpen);

  return (<ThemeProvider theme={theme()}>
    <CssBaseline/>
    <ResponsiveHeader title={'Visor d\'expedients'} drawerWidth={drawerWidth} onMenuClick={handleDrawerToggle}>
      <Typography variant="caption" noWrap>IDE Menorca</Typography>
      <IconButton onClick={() => setDrawerOpen(true)}>
        <FilterListIcon className={classes.filterIcon}/>
      </IconButton>
    </ResponsiveHeader>
    <ResponsiveDrawer width={drawerWidth} isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
      <SectionTitle title='Tipo de expediente'/>
      <CategoricFilter categories={categories} selected={selectedCategories} onSelectionChange={setSelectedCategories}/>
      <SectionTitle title='Rango de fechas'/>
      <RangeSlider min={minDate} max={maxDate} value={dateRange} onValueChange={setDateRange}/>
    </ResponsiveDrawer>
    <main className={clsx(classes.contentWithoutDrawer, {
      [classes.contentWithDrawer]: isDrawerOpen,
    })}>
      <Map
        mapStyle={selectedStyleUrl}
        auth={auth}
        sources={sources}
        layers={layers}
        viewport={viewport}
        onMapSet={onMapSet}
        onViewportChange={onViewportChange}
      />
      <BaseMapPicker
        selectedStyleUrl={selectedStyleUrl}
        onStyleChange={setSelectedStyleUrl}
        styles={mapStyles}
        position='bottom-right'
        direction='up'
      />
    </main>
  </ThemeProvider>);
};

const target = document.getElementById('app');
if (target) ReactDOM.render(<App/>, target);
