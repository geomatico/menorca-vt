import ReactDOM from 'react-dom';
import React, {useEffect, useState} from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {Card, CardContent} from '@material-ui/core';

import {debounce} from 'throttle-debounce';

import Map from './components/Map';
import CategoricFilter from './components/CategoricFilter';
import ResolutionStateChart from './components/ResolutionStateChart';
import TypeCountByYearChart from './components/TypeCountByYearChart';
import BaseMapPicker from './components/BaseMapPicker';
import RangeSlider from './components/RangeSlider';

const styles = [
  {
    label: 'IDE Menorca',
    thumbnail: './img/ide-menorca-vector.png',
    url: 'menorca_base_vector.json'
  },{
    label: 'Base IGO',
    thumbnail: './img/mapa-base-igo.png',
    url: 'https://vts.larioja.org/style/mapa-base-igo-v1.json'
  },{
    label: 'OSM Bright',
    thumbnail: 'https://openicgc.github.io/img/osm-bright.png',
    url: 'https://geoserveis.icgc.cat/contextmaps/osm-bright.json'
  },{
    label: 'Positron',
    thumbnail: 'https://openicgc.github.io/img/positron.png',
    url: 'https://geoserveis.icgc.cat/contextmaps/positron.json'
  },{
    label: 'Hibrid',
    thumbnail: 'https://openicgc.github.io/img/orto.png',
    url: 'https://geoserveis.icgc.cat/contextmaps/hibrid.json'
  },{
    label: 'Full Dark',
    thumbnail: 'https://openicgc.github.io/img/fulldark.png',
    url: 'https://geoserveis.icgc.cat/contextmaps/fulldark.json'
  }
];

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

const auth = [{
  urlMatch: process.env.EXPEDIENTS_LAYER,
  user: process.env.EXPEDIENTS_USER,
  password: process.env.EXPEDIENTS_PASSWORD
}];

const minDate = 1977;
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
  const [viewport, setViewport] = useState({
    latitude: 39.945,
    longitude: 4.060,
    zoom: 10,
    bearing: 0,
    pitch: 0
  });

  const [selectedStyleUrl, setSelectedStyleUrl] = useState('https://geoserveis.icgc.cat/contextmaps/fulldark.json');

  const [selectedCategories, setSelectedCategories] = useState(categories.map(({id}) => id));

  const [dateRange, setDateRange] = useState([minDate, maxDate]);

  const [layers, setLayers]= useState(buildLayers(selectedCategories, dateRange));

  const [data, setData] = useState({
    typeCountByYear: [],
    resolutionStateCount: []
  });

  useEffect(() => {
    setLayers(buildLayers(selectedCategories, dateRange));
  }, [selectedCategories, dateRange]);

  const onViewportChange = ({ latitude, longitude, zoom, bearing, pitch }) => setViewport({
    latitude,
    longitude,
    zoom,
    bearing,
    pitch,
  });

  const calcStats = debounce(10, (map) => {
    const featureProps = map
      .queryRenderedFeatures({
        layers: sourceLayers
      })
      .map(feature => feature.properties)
      .filter(({any}) => any >= dateRange[0] && any <= dateRange[1]);

    const objTypeCountByYear = featureProps
      .reduce((stats, props) => {
        const year = props.any;
        const type = props.tipus;

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

    const objResolutionStateCount = featureProps
      .map(props => props.resolucio)
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

  const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  return (<ThemeProvider theme={theme}>
    <Map
      mapStyle ={selectedStyleUrl}
      auth = {auth}
      sources = {sources}
      layers = {layers}
      viewport = {viewport}
      onMapSet = {onMapSet}
      onViewportChange = {onViewportChange}
    />
    <BaseMapPicker selectedStyleUrl={selectedStyleUrl} onStyleChange={setSelectedStyleUrl} styles={styles} position='top-right' direction='down' />
    <div style={{position: 'absolute', top: 10, left: 10}}>
      <CategoricFilter categories={categories} selected={selectedCategories} onSelectionChange={setSelectedCategories} />
    </div>
    <div style={{position: 'absolute', bottom: 278, right: 10, width: 532}}>
      <Card elevation={5}>
        <CardContent>
          <RangeSlider min={minDate} max={maxDate} value={dateRange} onValueChange={setDateRange} />
        </CardContent>
      </Card>
    </div>
    <div style={{position: 'absolute', bottom: 30, right: 10}}>
      <Card elevation={5}>
        <CardContent>
          <TypeCountByYearChart categories={categories} data={data.typeCountByYear} />
        </CardContent>
      </Card>
    </div>
    <div style={{position: 'absolute', bottom: 30, right: 550}}>
      <Card elevation={5}>
        <CardContent>
          <ResolutionStateChart data={data.resolutionStateCount} />
        </CardContent>
      </Card>
    </div>
  </ThemeProvider>);
};

const target = document.getElementById('app');
if (target) ReactDOM.render(<App />, target);
