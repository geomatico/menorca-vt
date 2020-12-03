import ReactDOM from 'react-dom';
import React, {useState} from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import {debounce} from 'throttle-debounce';
import Map from './components/Map';
import ChartCard from './components/ChartCard';

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
  altres: '#E9FFBE'
};

const fallback_color = '#FF00FF';

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
        fallback_color
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
        fallback_color
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

  const [data, setData] = useState([]);

  const onViewportChange = ({ latitude, longitude, zoom, bearing, pitch }) => setViewport({
    latitude,
    longitude,
    zoom,
    bearing,
    pitch,
  });

  const calcStats = debounce(10, (map) => {
    console.log('Calculating statistics.');
    const features = map.queryRenderedFeatures({
      layers: ['or007exp_expedients_a', 'or007exp_expedients_b', 'or007exp_expedients_c']
    });

    const stats = features
      .map(feature => feature.properties)
      .reduce((stats, props) => {
        const year = props.idordena.split('/')[0];
        const type = props.tipus;

        stats[year] = stats[year] || {};
        stats[year][type] = stats[year][type] ? stats[year][type] + 1 : 1;
        return stats;
      }, {});

    const data = Object.keys(stats)
      .reduce((data, year) => {
        data.push({
          year: year,
          ...stats[year]
        });
        return data;
      }, []);

    setData(data);
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

  const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  return (<ThemeProvider theme={theme}>
    <Map
      mapStyle = 'https://geoserveis.icgc.cat/contextmaps/fulldark.json'
      authHeader = {'Basic ' + btoa(process.env.EXPEDIENTS_USER + ':' + process.env.EXPEDIENTS_PASSWORD)}
      authUrl = {process.env.EXPEDIENTS_HOST}
      sources = {sources}
      layers = {layers}
      viewport = {viewport}
      onMapSet = {onMapSet}
      onViewportChange = {onViewportChange}
    />
    <div style={{position: 'absolute', bottom: 30, right: 10}}>
      <ChartCard data={data} colors={colors} />
    </div>
  </ThemeProvider>);
};

const target = document.getElementById('app');
if (target) ReactDOM.render(<App />, target);
