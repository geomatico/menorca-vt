import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import {debounce} from 'throttle-debounce';
import Map from '@geomatico/geocomponents/Map';

import config from '../../config.json';

// TODO build from config
const sources = {
  'expedients-consell': {
    'type': 'vector',
    'tiles': [
      `https://${process.env.TILE_HOST}/geoserver/ordenacio_restringit/gwc/service/tms/1.0.0/${process.env.EXPEDIENTS_CONSELL_LAYER}@MVT@pbf/{z}/{x}/{y}.pbf`
    ],
    'scheme': 'tms',
    'minzoom': 9,
    'maxzoom': 15
  },
  'expedients-ciutadella': {
    'type': 'vector',
    'tiles': [
      `https://${process.env.TILE_HOST}/geoserver/ordenacio_restringit/gwc/service/tms/1.0.0/${process.env.EXPEDIENTS_CIUTADELLA_LAYER}@MVT@pbf/{z}/{x}/{y}.pbf`
    ],
    'scheme': 'tms',
    'minZoom': 9,
    'maxZoom': 15
  }
};

const buildLayers = (visibleCategories, dateRange) => (
  Object.entries(config.datasources).flatMap(([key, datasource]) =>
    datasource.layers.map(sourceLayer => ({
      'id': sourceLayer,
      'type': 'circle',
      'source': `expedients-${key}`,
      'source-layer': sourceLayer,
      'filter': ['all',
        ['in',
          ['get', 'tipus'],
          ['literal', datasource.categories.filter(({id}) => visibleCategories[key].includes(id)).flatMap(({values}) => values)]
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
          ...datasource.categories.flatMap(({values, color}) =>
            values.flatMap(value => [value, color])
          ),
          config.fallbackColor
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
    }))
  )
);

const ExpedientsMap = ({mapStyle, dateRange, visibleCategories, onRenderedFeaturesChanged, onBBOXChanged}) => {
  const mapRef = useRef();
  const [viewport, setViewport] = useState(config.initialViewport);

  const layers = useMemo(() => buildLayers(visibleCategories, dateRange),[visibleCategories, dateRange]);

  const auth = [{
    urlMatch: 'ordenacio_restringit',
    user: localStorage.getItem('menorca.expedients.user'),
    password: localStorage.getItem('menorca.expedients.password')
  }];

  // On mount, wait for map render and notify changes
  const mapRefCb = useCallback(map => {
    if (map) {
      map.once('idle', () => queryRenderedFeatures());
      onBBOXChanged(map.getBounds().toArray().flatMap(a => a).join(','));
    }
    mapRef.current = map;
  }, []);

  // On viewport change, notify changes
  useEffect(() => {
    mapRef && mapRef.current?.once('idle', () => queryRenderedFeatures(mapRef));
    mapRef && onBBOXChanged(mapRef.current?.getBounds().toArray().flatMap(a => a).join(','));
  }, [viewport, layers]);

  const queryRenderedFeatures = debounce(10, () => {
    if (mapRef) {
      const renderedFeatures = mapRef.current?.queryRenderedFeatures({
        layers: Object.values(config.datasources).flatMap(datasource => datasource.layers)
      });
      onRenderedFeaturesChanged(renderedFeatures);
    }
  });

  return <Map
    ref={mapRefCb}
    mapStyle={mapStyle}
    auth={auth}
    sources={sources}
    layers={layers}
    viewport={viewport}
    onViewportChange={setViewport}
  />;
};

ExpedientsMap.propTypes = {
  mapStyle: PropTypes.string.isRequired,
  dateRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  visibleCategories: PropTypes.object.isRequired,
  onRenderedFeaturesChanged: PropTypes.func.isRequired,
  onBBOXChanged: PropTypes.func.isRequired
};

export default ExpedientsMap;
