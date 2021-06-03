import React, {useEffect, useMemo, useState} from 'react';
import {debounce} from 'throttle-debounce';
import {useDispatch, useSelector} from 'react-redux';

import ReactCardFlip from 'react-card-flip';
import FilterListIcon from '@material-ui/icons/FilterList';
import {makeStyles} from '@material-ui/core/styles';
import {Box, Hidden, IconButton, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import {CategoricFilter, Map, RangeSlider} from '@geomatico/geocomponents';

import config from '../config.json';
import SectionTitle from '../components/SectionTitle';
import ResponsiveHeader from '../components/ResponsiveHeader';
import RightDrawer from '../components/RightDrawer';
import LeftDrawer from '../components/LeftDrawer';
import TypeCountByYearChart from '../components/TypeCountByYearChart';
import ResolutionStateChart from '../components/ResolutionStateChart';
import SquareButtonIcon from '../components/SquareButtonIcon';
import LogoBlanco from '../../static/img/LogoBlanco';
import Chart from '../components/Chart';
import BaseMapList from '../components/BaseMapList';
import {fetchTotalExpedients, fetchTotalViviendes} from '../api';
import NumericIndicator from '../components/NumericIndicator';
import {
  getData,
  getDateRangeFilter,
  getSelectedBaseMapStyleUrl,
  getSelectedCategories,
  getViewport,
  getTotalExpedients
} from '../selectors';
import {
  setBaseMapStyleUrl,
  setDataContext,
  setDataTotal,
  setDateRangeFilter,
  setSelectedCategories,
  setViewport
} from '../actions';

const {mapStyles, sourceLayers, categories, fallbackColor, minDate} = config;

const RIGHT_DRAWER_WIDTH = 360;
const LEFT_DEFAULT_DRAWER_WIDTH = 420;

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
  buttonContent: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: 'auto',
    width: ({isRightDrawerOpen}) => isRightDrawerOpen ? `calc(100% - ${RIGHT_DRAWER_WIDTH}px)` : '100%',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  filterIconContainer: {
    zIndex: 40,
    position: 'absolute',
    top: 100,
  },
  drawerTitle: {
    padding: theme.spacing(2.5, 0, 0, 0),
    fontWeight: 'bold',
    marginBottom: 5
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

const Expedients = () => {
  const dispatch = useDispatch();
  const viewport = useSelector(getViewport);
  const selectedStyleUrl = useSelector(getSelectedBaseMapStyleUrl);
  const selectedCategories = useSelector(getSelectedCategories);
  const dateRange = useSelector(getDateRangeFilter);
  const {context} = useSelector(getData);
  const totalExpedients = useSelector(getTotalExpedients);

  const [isRightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [isFlipped, setFlipped] = useState(false);
  const [leftDrawerWidth, setLeftDrawerWidth] = useState(LEFT_DEFAULT_DRAWER_WIDTH);

  const layers = useMemo(() =>
    buildLayers(selectedCategories, dateRange), [selectedCategories, dateRange]);

  useEffect(() => {
    fetchTotalExpedients(...dateRange)
      .then((totalExpedients) => dispatch(setDataTotal({
        expedientsByType: totalExpedients
      })));
  }, [dateRange]);

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

    dispatch(setDataContext({
      expedients: featureProperties.length,
      typeCountByYear: arrTypeCountByYear,
      resolutionStateCount: arrResolutionStateCount
    }));
  });

  const onMapSet = (map) => {
    map.on('idle', () => {
      calcStats(map);
      fetchTotalViviendes(map.getBounds().toArray().flatMap(a => a).join(','))
        .then((totalViviendas) =>
          dispatch(setDataContext(...totalViviendas)));
    });
  };

  const classes = useStyles({isRightDrawerOpen, leftDrawerWidth});

  // Handlers
  const handleDrawerToggle = () => setRightDrawerOpen(!isRightDrawerOpen);
  const handleCardFlip = () => setFlipped(!isFlipped);
  const handleDrawerWidthChange = (width) => setLeftDrawerWidth(width);
  const handleViewportChange = ({latitude, longitude, zoom, bearing, pitch}) => dispatch(setViewport({
    latitude,
    longitude,
    zoom,
    bearing,
    pitch,
  }));
  const handleStyleChange = (newStyle) => dispatch(setBaseMapStyleUrl(newStyle));
  const handleSelectedCategoriesChange = (newCategories) => dispatch(setSelectedCategories(newCategories));
  const handleDateRangeChange = (newRange) => dispatch(setDateRangeFilter(newRange));
  
  
  const ChartsComponent = () =>
    <>
      <Chart title={'Nombre d\'expedients per any'}>
        <TypeCountByYearChart categories={categories} data={context.typeCountByYear}/>
      </Chart>
      <Chart title={'Percentatge de resolució d\'expedients'}>
        <ResolutionStateChart data={context.resolutionStateCount}/>
      </Chart>
      <Chart title={'Total d\'expedients'}>
        <NumericIndicator
          main={context.expedients}
          total={totalExpedients}/>
      </Chart>
      <Chart title={'Viviendes vs total locales'}>
        <NumericIndicator title={''} main={parseInt(context.numberofdwellings)} total={parseInt(context.numberofbuildingunits)}/>
      </Chart>
    </>;

  return (
    <div>
      {/*RIGHTDRAWER IN DESKTOP & MOBILE*/}
      <Hidden xsDown implementation="css">
        <div className={classes.buttonContent}>
          <SquareButtonIcon className={classes.filterIconContainer} onClick={handleDrawerToggle}>
            <FilterListIcon/>
          </SquareButtonIcon>
        </div>
      </Hidden>
      <RightDrawer width={RIGHT_DRAWER_WIDTH} isOpen={isRightDrawerOpen} onClose={() => setRightDrawerOpen(false)}>
        <SectionTitle title={'Tipus d\'expedients'}/>
        <CategoricFilter categories={categories} selected={selectedCategories} onSelectionChange={handleSelectedCategoriesChange}/>
        <SectionTitle title='Rang de dates'/>
        <div style={{padding: '0 16px'}}>
          <RangeSlider min={minDate} max={maxDate} value={dateRange} onValueChange={handleDateRangeChange}/>
        </div>
        <SectionTitle title='Mapes base'/>
        <BaseMapList
          isSelected={selectedStyleUrl === mapStyles.url}
          styles={mapStyles}
          selectedStyleUrl={selectedStyleUrl}
          onStyleChange={handleStyleChange}
        />
      </RightDrawer>

      {/*LEFTDRAWER MOBILE*/}
      <Hidden smUp implementation="js">
        <ResponsiveHeader
          startIcon={<MenuIcon/>}
          onMenuClick={handleCardFlip}
          logo={<LogoBlanco/>}
        >
          <IconButton onClick={handleDrawerToggle}>
            <FilterListIcon style={{color: 'white'}}/>
          </IconButton>
        </ResponsiveHeader>
        <ReactCardFlip isFlipped={isFlipped}>
          <main style={{width: '100vw', height: '100vh'}}>
            <Map
              mapStyle={selectedStyleUrl}
              auth={auth}
              sources={sources}
              layers={layers}
              viewport={viewport}
              onMapSet={onMapSet}
              onViewportChange={handleViewportChange}
            />
          </main>
          <Box px={2}>
            <Typography className={classes.drawerTitle} variant='h6'>Visor d&#039;expedients</Typography>
            <ChartsComponent />
          </Box>
        </ReactCardFlip>
      </Hidden>

      {/*LEFTDRAWER DESKTOP*/}
      <Hidden xsDown implementation="css">
        <LeftDrawer
          defaultDrawerWidth={LEFT_DEFAULT_DRAWER_WIDTH}
          onDrawerWidthChange={handleDrawerWidthChange}
        >
          <ChartsComponent />
        </LeftDrawer>
        <main className={classes.content}>
          <Map
            mapStyle={selectedStyleUrl}
            auth={auth}
            sources={sources}
            layers={layers}
            viewport={viewport}
            onMapSet={onMapSet}
            onViewportChange={handleViewportChange}
          />
        </main>
      </Hidden>
    </div>);
};

export default Expedients;