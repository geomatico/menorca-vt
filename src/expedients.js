import ReactDOM from 'react-dom';
import React, {useEffect, useState} from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import {debounce} from 'throttle-debounce';
import Map from './components/Map';
import ChartCard from './components/ChartCard';
import CategoricFilter from './components/CategoricFilter';

const sourceLayers = [
  'or007exp_negociat45',
  'or007exp_negociat41',
  'or007exp_negociat37'
];

const categories = [
  {id: 'CED', values: ['CED'], color: '#C9C900', label: 'CED. Cèdules urbanístiques' },
  {id: 'DUP', values: ['DUP'], color: '#FFFF73', label: 'DUP. Expedients de duplicat de cèdules' },
  {id: 'AUT', values: ['AUT'], color: '#00C5FF', label: 'AUT. Litoral' },
  {id: 'DTQ', values: ['DTQ'], color: '#0084A8', label: 'DTQ. Declaracio responsable litoral' },
  {id: 'NUI', values: ['NUI'], color: '#E69800', label: 'NUI. Declaració interés general' },
  {id: 'ERE', values: ['ERE'], color: '#FFEBAF', label: 'ERE. Edificacions en sòl rúsic' },
  {id: 'INF', values: ['INF'], color: '#C29ED7', label: 'INF. Informes urbanístics i d\'ordenació. Inclou AIA' },
  {id: 'ORD', values: ['ORD'], color: '#E69800', label: 'ORD. Expedients diversos ordenació' },
  {id: 'PO', values: ['PO'], color: '#E60000', label: 'PO. Procediments judicials' },
  {id: 'altres', values: ['INU', 'LIA', 'LIC', 'NUH', 'PRCED', 'SAN'], color: '#E9FFBE', label: 'Altres. Inclou (INU; LIA; LIC; NUH; PRCED; SAN)' },
];

const fallbackColor = '#FF00FF';

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

const buildLayers = (selectedCategories) => sourceLayers.map(sourceLayer => ({
  'id': sourceLayer,
  'type': 'circle',
  'source': 'expedients',
  'source-layer': sourceLayer,
  'filter': ['in', ['get', 'tipus'], ['literal',
    categories.filter(({id}) => selectedCategories.includes(id)).flatMap(({values}) => values)]
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
  const [viewport, setViewport] = useState({
    latitude: 39.945,
    longitude: 4.060,
    zoom: 10,
    bearing: 0,
    pitch: 0
  });

  const [selectedCategories, setSelectedCategories] = useState(categories.map(({id}) => id));

  const [layers, setLayers]= useState(buildLayers(selectedCategories));

  const [data, setData] = useState([]);

  useEffect(() => {
    setLayers(buildLayers(selectedCategories));
  }, [selectedCategories]);

  const onViewportChange = ({ latitude, longitude, zoom, bearing, pitch }) => setViewport({
    latitude,
    longitude,
    zoom,
    bearing,
    pitch,
  });

  const calcStats = debounce(10, (map) => {
    const features = map.queryRenderedFeatures({
      layers: sourceLayers
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
    map.on('idle', () => {
      calcStats(map);
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
    <div style={{position: 'absolute', top: 10, left: 10}}>
      <CategoricFilter categories={categories} selected={selectedCategories} onSelectionChange={setSelectedCategories} />
    </div>
    <div style={{position: 'absolute', bottom: 30, right: 10}}>
      <ChartCard data={data} categories={categories} />
    </div>
  </ThemeProvider>);
};

const target = document.getElementById('app');
if (target) ReactDOM.render(<App />, target);
