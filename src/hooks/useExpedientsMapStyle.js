import config from '../config.json';
import {useMemo} from 'react';

const sources = Object.entries(config.datasets).reduce((obj, [datasetId, {layer}]) => ({
  ...obj,
  [`expedients-${datasetId}`]: {
    'type': 'vector',
    'tiles': [config.services.tms.replace('{layer}', layer)],
    'scheme': 'tms',
    'minzoom': 9,
    'maxzoom': 15
  }
}), {});

const useExpedientsMapStyle = (visibleCategories, dateRange) => {

  const layers = useMemo(() => Object.entries(config.datasets).flatMap(([datasetId, dataset]) =>
    dataset.sourceLayers.map(sourceLayer => ({
      'id': sourceLayer,
      'type': 'circle',
      'source': `expedients-${datasetId}`,
      'source-layer': sourceLayer,
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
    }))
  ), [visibleCategories, dateRange]);

  return {sources, layers};
};

export default useExpedientsMapStyle;
