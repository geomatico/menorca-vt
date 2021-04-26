import ReactDOM from 'react-dom';
import React, {useEffect, useState} from 'react';
import {debounce} from 'throttle-debounce';
import ReactCardFlip from 'react-card-flip';

import {ThemeProvider, makeStyles} from '@material-ui/core/styles';
import {CssBaseline, Typography, IconButton, Hidden, Box} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

import {BaseMapPicker, CategoricFilter, Map, RangeSlider} from 'geocomponents';

import theme from './theme';
import config from './config.json';
import SectionTitle from './components/SectionTitle';
import ResponsiveHeader from './components/ResponsiveHeader';
import RightDrawer from './components/RightDrawer';
import LeftDrawer from './components/LeftDrawer';
import TypeCountByYearChart from './components/TypeCountByYearChart';
import ResolutionStateChart from './components/ResolutionStateChart';

const {mapStyles, sourceLayers, categories, fallbackColor, minDate, initialViewport} = config;

const RIGHT_DRAWER_WIDTH = 340;
const LEFT_DEFAULT_DRAWER_WIDTH = 400;


const useStyles = makeStyles((theme) => ({
  content: {
    width: ({leftDrawerWidth}) => `calc(100% - ${leftDrawerWidth}px)`,
    height: '100vh',
    flexGrow: 1,
    padding: 0,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: ({leftDrawerWidth}) => leftDrawerWidth,
  },
  filterIcon: {
    color: theme.palette.primary.contrastText,
    margin: 0
  },
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
  const [isRightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [isFlipped, setFlipped] = useState(false);
  const [leftDrawerWidth, setLeftDrawerWidth] = useState(LEFT_DEFAULT_DRAWER_WIDTH);

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

  const classes = useStyles({leftDrawerWidth});

  const handleDrawerToggle = () => setRightDrawerOpen(!isRightDrawerOpen);
  const handleCardFlip = () => setFlipped(!isFlipped);
  const handleDrawerWidthChange = (width) => {
    setLeftDrawerWidth(width);
  };

  return (<ThemeProvider theme={theme()}>
    <CssBaseline/>
    <ResponsiveHeader title={'Visor d\'expedients'} drawerWidth={RIGHT_DRAWER_WIDTH} onMenuClick={handleCardFlip}>
      <Hidden smDown implementation="css">{/*DESKTOP*/}
        <Typography variant="caption" noWrap>IDE Menorca</Typography>
      </Hidden>
      <IconButton onClick={handleDrawerToggle}>
        <FilterListIcon className={classes.filterIcon}/>
      </IconButton>
    </ResponsiveHeader>

    {/*RIGHTDRAWER IN DESKTOP & MOBILE*/}
    <RightDrawer width={RIGHT_DRAWER_WIDTH} isOpen={isRightDrawerOpen} onClose={() => setRightDrawerOpen(false)}>
      <SectionTitle title={'Tipus d\'expedients'}/>
      <CategoricFilter categories={categories} selected={selectedCategories} onSelectionChange={setSelectedCategories}/>
      <SectionTitle title='Rang de dates'/>
      <RangeSlider min={minDate} max={maxDate} value={dateRange} onValueChange={setDateRange}/>
    </RightDrawer>

    {/*LEFTDRAWER MOBILE*/}
    <Hidden smUp implementation="js">
      <ReactCardFlip isFlipped={isFlipped}>
        <main style={{width: '100vw', height: '100vh'}}>
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
        <Box px={2} style={{width: '100%', height: '100%'}}>
          <SectionTitle title={'Nombre d\'expedients per any'}/>
          <TypeCountByYearChart categories={categories} data={data.typeCountByYear}/>
          <SectionTitle title={'Percentatge de resolució d\'expedients'}/>
          <ResolutionStateChart data={data.resolutionStateCount}/>
        </Box>
      </ReactCardFlip>
    </Hidden>

    {/*LEFTDRAWER DESKTOP*/}
    <Hidden xsDown implementation="css">
      <LeftDrawer
        defaultDrawerWidth={LEFT_DEFAULT_DRAWER_WIDTH}
        onDrawerWidthChange={handleDrawerWidthChange}
      >
        <SectionTitle title={'Nombre d\'expedients per any'}/>
        <TypeCountByYearChart categories={categories} data={data.typeCountByYear}/>
        <SectionTitle title={'Percentatge de resolució d\'expedients'}/>
        <ResolutionStateChart data={data.resolutionStateCount}/>
      </LeftDrawer>
      <main className={classes.content}>
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
    </Hidden>
  </ThemeProvider>);

};

const target = document.getElementById('app');
if (target) ReactDOM.render(<App/>, target);
