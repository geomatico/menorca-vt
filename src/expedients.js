import ReactDOM from 'react-dom';
import React, {useState} from 'react';
import {debounce} from 'throttle-debounce';
import Map from './components/Map';

const colors = {
  // Negociat 45 - a
  CED: '#C9C900',
  DUP: '#FFFF73',
  // Negociat 41 - b
  AUT: '#00C5FF',
  DTQ: '#0084A8',
  // Negociat 37 - c
  NUI: '#E69800',
  ERE: '#FFEBAF',
  INF: '#C29ED7',
  ORD: '#E69800',
  PO: '#E60000',
  altres: '#E9FFBE',
  // Altres codis
  default: '#FF00FF'
};

const sources = {
  'expedients': {
    'type': 'vector',
    'tiles': [
      `https://${process.env.EXPEDIENTS_HOST}/geoserver/ordenacio_restringit/wms?service=WMS&version=1.1.0&request=GetMap&layers=ordenacio_restringit:OR007EXP_expedients&bbox={bbox-epsg-3857}&width=512&height=512&srs=EPSG:3857&styles=&format=application/vnd.mapbox-vector-tile`
    ],
    'minzoom': 9,
    'maxzoom': 15
  }
};

const layers = [
  {
    'id': 'or007exp_expedients_a',
    'type': 'circle',
    'source': 'expedients',
    'source-layer': 'or007exp_negociat45',
    'paint': {
      'circle-color': ['match', ['get', 'tipus'],
        'CED', colors.CED,
        'DUP', colors.DUP,
        colors.default
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
  },
  {
    'id': 'or007exp_expedients_b',
    'type': 'circle',
    'source': 'expedients',
    'source-layer': 'or007exp_negociat41',
    'paint': {
      'circle-color': ['match', ['get', 'tipus'],
        'AUT', colors.AUT,
        'DTQ', colors.DTQ,
        colors.altres
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
  },
  {
    'id': 'or007exp_expedients_c',
    'type': 'circle',
    'source': 'expedients',
    'source-layer': 'or007exp_negociat37',
    'paint': {
      'circle-color': ['match', ['get', 'tipus'],
        'NUI', colors.NUI,
        'ERE', colors.ERE,
        'INF', colors.INF,
        'ORD', colors.ORD,
        'PO', colors.PO,
        colors.altres
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
  }
];


const App = () => {
  const [viewport, setViewport] = useState({
    latitude: 39.945,
    longitude: 4.060,
    zoom: 10,
    bearing: 0,
    pitch: 0
  });
  
  const onViewportChange = ({ latitude, longitude, zoom, bearing, pitch }) => setViewport({
    latitude,
    longitude,
    zoom,
    bearing,
    pitch,
  });

  const calcStats = debounce(100, (map) => {
    console.log('Calculating statistics.');
    const features = map.queryRenderedFeatures({
      layers: ['or007exp_expedients_a', 'or007exp_expedients_b', 'or007exp_expedients_c']
    });
    console.log(features.length);
  });

  const onMapSet = (map) => {
    console.log('The map was set.');
    map.on('moveend', () => {
      console.log('A moveend event occurred.');
      map.once('idle', () => {
        console.log('Idle after moveend.');
        calcStats(map);
      });
    });
  };

  return <Map
    mapStyle = 'https://geoserveis.icgc.cat/contextmaps/fulldark.json'
    authHeader = {'Basic ' + btoa(process.env.EXPEDIENTS_USER + ':' + process.env.EXPEDIENTS_PASSWORD)}
    authUrl = {process.env.EXPEDIENTS_HOST}
    sources = {sources}
    layers = {layers}
    viewport = {viewport}
    onMapSet = {onMapSet}
    onViewportChange = {onViewportChange}
  />;
};

const target = document.getElementById('app');
if (target) ReactDOM.render(<App />, target);
