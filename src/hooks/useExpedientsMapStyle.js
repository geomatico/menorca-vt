import config from '../config.json';
import {useMemo} from 'react';
import useExpedients from './useExpedients';

const useExpedientsMapStyle = (visibleCategories, dateRange) => {
  const data = Object.keys(config.datasets).map(useExpedients);
  const allDataReceived = data.every(value => !!value);

  const sources = useMemo(() => allDataReceived ? Object.keys(config.datasets)
    .reduce((obj, datasetId, i) => ({
      ...obj,
      [`expedients-${datasetId}`]: {
        'type': 'geojson',
        'data': data[i]
      }
    }), {}) : {}, [allDataReceived]);

  const layers = useMemo(() => !!sources && Object.entries(config.datasets)
    .map(([datasetId, dataset]) => ({
      'id': datasetId,
      'type': 'circle',
      'source': `expedients-${datasetId}`,
      'filter': ['all',
        ['in',
          ['get', 'tipus'],
          ['literal', dataset.categories.filter(({id}) => visibleCategories[datasetId].includes(id)).flatMap(({values}) => values)]
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
          ...dataset.categories.flatMap(({values, color}) =>
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
    })), [sources, visibleCategories, dateRange]);

  return {sources, layers};
};

export default useExpedientsMapStyle;
