import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import {debounce} from 'throttle-debounce';
import Map from '@geomatico/geocomponents/Map';

import config from '../../config.json';
import {calcStats} from '../../services/calcStats';

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

const ExpedientsMap = ({setStats, mapStyle, onBBOXChanged, isExpedientsConsellVisible, selectedConsellCategories, isExpedientsCiutadellaVisible, selectedCiutadellaCategories, dateRange}) => {
  const mapRef = useRef();
  const [viewport, setViewport] = useState(config.initialViewport);

  const buildConsellLayers = (isExpedientsConsellVisible, selectedConsellCategories, dateRange) => (
    isExpedientsConsellVisible ?
      config.consellSourceLayers.map(sourceLayer => ({
        'id': sourceLayer,
        'type': 'circle',
        'source': 'expedientsConsell',
        'source-layer': sourceLayer,
        'filter': ['all',
          ['in',
            ['get', 'tipus'],
            ['literal', config.consellCategories.filter(({id}) => selectedConsellCategories.includes(id)).flatMap(({values}) => values)]
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
            ...config.consellCategories.flatMap(({values, color}) =>
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
            ['literal', config.ciutadellaCategories.filter(({id}) => selectedCiutadellaCategories.includes(id)).flatMap(({values}) => values)]
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
            ...config.ciutadellaCategories.flatMap(({values, color}) =>
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
      }] : []
  );

  const layers = useMemo(() => ([
    ...buildConsellLayers(isExpedientsConsellVisible, selectedConsellCategories, dateRange),
    ...buildCiutadellaLayers(isExpedientsCiutadellaVisible, selectedCiutadellaCategories, dateRange)
  ]),
  [
    isExpedientsConsellVisible, selectedConsellCategories,
    isExpedientsCiutadellaVisible, selectedCiutadellaCategories,
    dateRange
  ]);

  const auth = [{
    urlMatch: 'ordenacio_restringit',
    user: localStorage.getItem('menorca.expedients.user'),
    password: localStorage.getItem('menorca.expedients.password')
  }];
  // On mount, wait for map render and call updateStats
  // Set mapRef for future renders
  const mapRefCb = useCallback(map => {
    if (map) {
      map.once('idle', () => updateStats());
      onBBOXChanged(map.getBounds().toArray().flatMap(a => a).join(','));
    }
    mapRef.current = map;
  }, []);

  // On map changes, call updateStats
  useEffect(() => {
    mapRef && mapRef.current?.once('idle', () => updateStats(mapRef));
    mapRef && onBBOXChanged(mapRef.current?.getBounds().toArray().flatMap(a => a).join(','));
  }, [viewport, layers]);

  const updateStats = debounce(10, () => {
    if (mapRef) {
      const featureProperties = mapRef.current?.queryRenderedFeatures({
        layers: [
          ...(isExpedientsConsellVisible ? config.consellSourceLayers : []),
          ...(isExpedientsCiutadellaVisible ? ['or015urb_llicencies'] : [])
        ]
      })
        .map(feature => feature.properties)
        .filter(({any}) => any >= dateRange[0] && any <= dateRange[1]);

      setStats(calcStats(featureProperties));
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
  setStats: PropTypes.func.isRequired,
  mapStyle: PropTypes.string.isRequired,
  onBBOXChanged: PropTypes.func.isRequired,
  isExpedientsConsellVisible: PropTypes.bool.isRequired,
  selectedConsellCategories: PropTypes.array.isRequired,
  isExpedientsCiutadellaVisible: PropTypes.bool.isRequired,
  selectedCiutadellaCategories: PropTypes.array.isRequired,
  dateRange: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default ExpedientsMap;
