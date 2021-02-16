import ReactDOM from 'react-dom';
import React, {useEffect, useState} from 'react';
import {debounce} from 'throttle-debounce';

import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {Card, CardContent} from '@material-ui/core';

import config from './config.json';

import {BaseMapPicker, CategoricFilter, Map, RangeSlider} from 'geocomponents';
import ResolutionStateChart from './components/ResolutionStateChart';
import TypeCountByYearChart from './components/TypeCountByYearChart';

const {mapStyles, sourceLayers, categories, fallbackColor, minDate, initialViewport} = config;

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

  const theme = createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#99CC33',
        contrastText: '#fff',
      },
      secondary: {
        main: '#228042',
      }
    }
  });

  return (<ThemeProvider theme={theme}>
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
      position='top-right'
      direction='down'
    />
    <div style={{position: 'absolute', top: 10, left: 10}}>
      <CategoricFilter categories={categories} selected={selectedCategories} onSelectionChange={setSelectedCategories}/>
    </div>
    <div style={{position: 'absolute', bottom: 278, right: 10, width: 532}}>
      <Card elevation={5}>
        <CardContent>
          <RangeSlider min={minDate} max={maxDate} value={dateRange} onValueChange={setDateRange}/>
        </CardContent>
      </Card>
    </div>
    <div style={{position: 'absolute', bottom: 30, right: 10}}>
      <Card elevation={5}>
        <CardContent>
          <TypeCountByYearChart categories={categories} data={data.typeCountByYear}/>
        </CardContent>
      </Card>
    </div>
    <div style={{position: 'absolute', bottom: 30, right: 550}}>
      <Card elevation={5}>
        <CardContent>
          <ResolutionStateChart data={data.resolutionStateCount}/>
        </CardContent>
      </Card>
    </div>
  </ThemeProvider>);
};

const target = document.getElementById('app');
if (target) ReactDOM.render(<App/>, target);
