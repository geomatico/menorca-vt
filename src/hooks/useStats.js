import {useEffect, useState} from 'react';

const _calcStats = (featureProperties) => {

  const arrTypeCountByYear = featureProperties
    .reduce((stats, properties) => {
      const year = properties.any;
      const type = properties.tipus;

      const existing = stats.find(el => el.year === properties.any && el.type === properties.tipus);
      if (existing) {
        existing.value += 1;
      } else {
        stats = [
          ...stats,
          {
            year,
            type,
            value: 1
          }
        ];
      }
      return stats.sort((a,b) => a.year - b.year);
    }, []);

  const objResolutionStateCount = featureProperties
    .map(properties => properties.resolucio)
    .reduce((stats, resolucio) => {
      stats[resolucio] = stats[resolucio] ? stats[resolucio] + 1 : 1;
      return stats;
    }, {});

  const arrResolutionStateCount = Object.entries(objResolutionStateCount)
    .map(([resolucio, count]) => ({
      name: resolucio,
      value: count
    }));

  return ({
    expedients: featureProperties.length,
    typeCountByYear: arrTypeCountByYear,
    resolutionStateCount: arrResolutionStateCount
  });
};

const useStats = (renderedFeatures) => {
  const [stats, setStats] = useState({
    expedients: 0,
    typeCountByYear: [],
    resolutionStateCount: []
  });

  useEffect(() => setStats(_calcStats(renderedFeatures.map(f => f.properties))), [renderedFeatures]);

  return stats;
};

export default useStats;
