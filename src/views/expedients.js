import React, {useEffect, useMemo, useRef, useState} from 'react';
import {debounce} from 'throttle-debounce';
import {useDispatch, useSelector} from 'react-redux';
//MUI
import Box from '@mui/material/Box';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
//MUI-ICONS
import FilterListIcon from '@mui/icons-material/FilterList';
import MenuIcon from '@mui/icons-material/Menu';
//GEOCOMPONENTS
import BaseMapList from '@geomatico/geocomponents/BaseMapList';
import Map from '@geomatico/geocomponents/Map';
import RangeSlider from '@geomatico/geocomponents/RangeSlider';
import SwitchPad from '@geomatico/geocomponents/SwitchPad';
//MENORCA-VT
import ResponsiveHeader from '../components/ResponsiveHeader';
import RightDrawer from '../components/RightDrawer';
import LeftDrawer from '../components/LeftDrawer';
import SquareButtonIcon from '../components/SquareButtonIcon';
import LogoBlanco from '../../static/img/LogoBlanco';
import {fetchTotalExpedients, fetchTotalVivendes} from '../api';
import ChartsComponent from './map/ChartsComponents';
import ExpandContent from '../components/ExpandContent';
//OTHERS
import ReactCardFlip from 'react-card-flip';
//UTILS
import config from '../config.json';
import {
  getDateRangeFilter,
  getSelectedBaseMapStyleId,
  getSelectedConsellCategories,
  getSelectedCiutadellaCategories,
  getViewport,
  getExpedientsConsellVisible,
  getExpedientsCiutadellaVisible
} from '../selectors';
import {
  setBaseMapStyleId,
  setDataContext,
  setDataTotal,
  setDateRangeFilter,
  setViewport,
  setExpedientsConsellVisible,
  setExpedientsCiutadellaVisible,
  setSelectedConsellCategories,
  setSelectedCiutadellaCategories
} from '../actions';
import {calcStats} from '../services/calcStats';

const {mapStyles, consellSourceLayers, consellCategories, ciutadellaCategories, fallbackColor, minDate} = config;

//STYLES
const RIGHT_DRAWER_WIDTH = 360;
const LEFT_DEFAULT_DRAWER_WIDTH = 420;

const switchPadStyle = {
  '& .SwitchPad-text': {
    fontSize: '0.75rem'
  }
};
const drawerTitleStyle = {
  pt: { xs: 0, md: 2 },
  pl: 1,
  fontWeight: 'bold',
  mb: 0,
  textTransform: 'upperCase',
};
const baseMapListStyle = {
  '& .LayerSwitcher-text': {
    fontSize: '0.75rem'
  }
};

const auth = [{
  urlMatch: 'ordenacio_restringit',
  user: localStorage.getItem('menorca.expedients.user'),
  password: localStorage.getItem('menorca.expedients.password')
}];

const maxDate = new Date().getFullYear();

const sources = {
  'expedientsConsell': {
    'type': 'vector',
    'tiles': [
      `https://${process.env.TILE_HOST}/geoserver/ordenacio_restringit/gwc/service/tms/1.0.0/${process.env.EXPEDIENTS_CONSELL_LAYER}@MVT@pbf/{z}/{x}/{y}.pbf`
    ],
    'scheme': 'tms',
    'minzoom': 9,
    'maxzoom': 15
  },
  'expedientsCiutadella': {
    'type': 'vector',
    'tiles': [
      `https://${process.env.TILE_HOST}/geoserver/ordenacio_restringit/gwc/service/tms/1.0.0/${process.env.EXPEDIENTS_CIUTADELLA_LAYER}@MVT@pbf/{z}/{x}/{y}.pbf`
    ],
    'scheme': 'tms',
    'minZoom': 9,
    'maxZoom': 15
  }
};

const buildConsellLayers = (isExpedientsConsellVisible, selectedConsellCategories, dateRange) => (
  isExpedientsConsellVisible ?
    consellSourceLayers.map(sourceLayer => ({
      'id': sourceLayer,
      'type': 'circle',
      'source': 'expedientsConsell',
      'source-layer': sourceLayer,
      'filter': ['all',
        ['in',
          ['get', 'tipus'],
          ['literal', consellCategories.filter(({id}) => selectedConsellCategories.includes(id)).flatMap(({values}) => values)]
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
          ...consellCategories.flatMap(({values, color}) =>
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
    })) :
    []
);

const buildCiutadellaLayers = (isExpedientsCiutadellaVisible, selectedCiutadellaCategories, dateRange) => (
  isExpedientsCiutadellaVisible ?
    [{
      'id': 'or015urb_llicencies',
      'type': 'circle',
      'source': 'expedientsCiutadella',
      'source-layer': 'or015urb_llicencies',
      'filter':  ['all',
        ['in',
          ['get', 'tipus'],
          ['literal', ciutadellaCategories.filter(({id}) => selectedCiutadellaCategories.includes(id)).flatMap(({values}) => values)]
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
          ...ciutadellaCategories.flatMap(({values, color}) =>
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
    }] : []
);

const Expedients = () => {
  const mapRef = useRef();
  const dispatch = useDispatch();
  const viewport = useSelector(getViewport);
  const selectedStyleId = useSelector(getSelectedBaseMapStyleId);
  const isExpedientsConsellVisible = useSelector(getExpedientsConsellVisible);
  const selectedConsellCategories = useSelector(getSelectedConsellCategories);
  const isExpedientsCiutadellaVisible = useSelector(getExpedientsCiutadellaVisible);
  const selectedCiutadellaCategories = useSelector(getSelectedCiutadellaCategories);
  const dateRange = useSelector(getDateRangeFilter);

  const [isRightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [isFlipped, setFlipped] = useState(false);
  const [leftDrawerWidth, setLeftDrawerWidth] = useState(LEFT_DEFAULT_DRAWER_WIDTH);

  const layers = useMemo(() => ([
    ...buildConsellLayers(isExpedientsConsellVisible, selectedConsellCategories, dateRange),
    ...buildCiutadellaLayers(isExpedientsCiutadellaVisible, selectedCiutadellaCategories, dateRange)
  ]),
  [
    isExpedientsConsellVisible, selectedConsellCategories,
    isExpedientsCiutadellaVisible, selectedCiutadellaCategories,
    dateRange
  ]);

  useEffect(() => {
    fetchTotalExpedients(...dateRange)
      .then((totalExpedients) => dispatch(setDataTotal({
        expedientsByType: totalExpedients
      })));
  }, [dateRange]);

  const updateStats = debounce(10, () => {
    if (mapRef) {
      const featureProperties = mapRef.current?.queryRenderedFeatures({
        layers: [
          ...(isExpedientsConsellVisible ? consellSourceLayers : []),
          ...(isExpedientsCiutadellaVisible ? ['or015urb_llicencies'] : [])
        ]
      })
        .map(feature => feature.properties)
        .filter(({any}) => any >= dateRange[0] && any <= dateRange[1]);

      dispatch(setDataContext(calcStats(featureProperties)));

      fetchTotalVivendes(mapRef.current?.getBounds().toArray().flatMap(a => a).join(','))
        .then((totalViviendas) =>
          dispatch(setDataContext(...totalViviendas)));
    }
  });

  useEffect(() => {
    mapRef && mapRef.current?.once('idle', () => updateStats(mapRef));
  }, [viewport, layers]);

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
  const toggleExpedientsConsellLayer = (isOn) => dispatch(setExpedientsConsellVisible(isOn));
  const toggleExpedientsCiutadellaLayer = (isOn) => dispatch(setExpedientsCiutadellaVisible(isOn));
  const handleStyleChange = (newStyle) => dispatch(setBaseMapStyleId(newStyle));
  const handleSelectedConsellCategories = (newCategories) => dispatch(setSelectedConsellCategories(newCategories));
  const handleSelectedCiutadellaCategories = (newCategories) => dispatch(setSelectedCiutadellaCategories(newCategories));
  const handleDateRangeChange = (newRange) => dispatch(setDateRangeFilter(newRange));

  const mapComponent = <Map
    ref={mapRef}
    mapStyle={selectedStyleId}
    auth={auth}
    sources={sources}
    layers={layers}
    viewport={viewport}
    onViewportChange={handleViewportChange}
  />;

  const buttonContentStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    height: 'auto',
    width: isRightDrawerOpen ? `calc(100% - ${RIGHT_DRAWER_WIDTH}px)` : '100%',
    transition: theme => theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  };
  const mainContentStyle = {
    width: `calc(100% - ${leftDrawerWidth}px)`,
    height: '100vh',
    flexGrow: 1,
    padding: 0,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: leftDrawerWidth,
  };
  
  return <>
    {/*RIGHTDRAWER IN DESKTOP & MOBILE*/}
    <Hidden smDown implementation="css">
      <Box sx={buttonContentStyle}>
        <SquareButtonIcon onClick={handleDrawerToggle}>
          <FilterListIcon/>
        </SquareButtonIcon>
      </Box>
    </Hidden>
    <RightDrawer width={RIGHT_DRAWER_WIDTH} isOpen={isRightDrawerOpen} onClose={() => setRightDrawerOpen(false)}>
      <Typography sx={drawerTitleStyle} variant='body1'>Control de capes</Typography>
      <ExpandContent title={'Expedients consell insular'} isChecked={isExpedientsConsellVisible} onChange={toggleExpedientsConsellLayer}>
        <SwitchPad
          categories={consellCategories}
          selected={selectedConsellCategories}
          onSelectionChange={handleSelectedConsellCategories}
          sx={switchPadStyle}
        />
      </ExpandContent>
      <ExpandContent title={'Expedients Aj. Ciutadella'} isChecked={isExpedientsCiutadellaVisible} onChange={toggleExpedientsCiutadellaLayer}>
        <SwitchPad
          categories={ciutadellaCategories}
          selected={selectedCiutadellaCategories}
          onSelectionChange={handleSelectedCiutadellaCategories}
          sx={switchPadStyle}
        />
      </ExpandContent>
      <ExpandContent title={'Rang de dates'}>
        <div style={{padding: '0 16px', width: '100%'}}>
          <RangeSlider min={minDate} max={maxDate} value={dateRange} onValueChange={handleDateRangeChange} animationInterval={1000}/>
        </div>
      </ExpandContent>
      <ExpandContent title={'Mapes base'}>
        <BaseMapList
          styles={mapStyles}
          selectedStyleId={selectedStyleId}
          onStyleChange={handleStyleChange}
          thumbnailWidth={60}
          thumbnailHeight={40}
          variant='list'
          sx={baseMapListStyle}
        />
      </ExpandContent>
    </RightDrawer>

    {/*LEFTDRAWER MOBILE*/}
    <Hidden smUp implementation="js">
      <ResponsiveHeader
        startIcon={<MenuIcon/>}
        onMenuClick={handleCardFlip}
        logo={<LogoBlanco/>}
      >
        <IconButton onClick={handleDrawerToggle} size="large">
          <FilterListIcon style={{color: 'white'}}/>
        </IconButton>
      </ResponsiveHeader>
      <ReactCardFlip isFlipped={isFlipped}>
        <main style={{width: '100vw', height: '100vh'}}>
          {mapComponent}
        </main>
        <Box sx={{px: 2, pt: 9.5}}>
          <Typography sx={drawerTitleStyle} variant='body1'>Visor d&#039;expedients</Typography>
          <ChartsComponent />
        </Box>
      </ReactCardFlip>
    </Hidden>

    {/*LEFTDRAWER DESKTOP*/}
    <Hidden smDown implementation="css">
      <LeftDrawer
        defaultDrawerWidth={LEFT_DEFAULT_DRAWER_WIDTH}
        onDrawerWidthChange={handleDrawerWidthChange}
      >
        <ChartsComponent />
      </LeftDrawer>
      <Box sx={mainContentStyle}>
        {mapComponent}
      </Box>
    </Hidden>
  </>;
};

export default Expedients;