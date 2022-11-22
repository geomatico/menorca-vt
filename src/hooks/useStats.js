import {useEffect, useState} from 'react';
import useFilteredExpedients from './useFilteredExpedients';

const _calcStats = (features) => {

  const arrTypeCountByYear = features
    .reduce((stats, {properties}) => {
      const year = properties.any;
      const type = properties.tipus;

      const existing = stats.find(el => el.year === properties.any && el.type === properties.tipus);
      if (existing) {
        existing.value += 1;
      } else {
        stats.push({
          year,
          type,
          value: 1
        });
      }
      return stats;
    }, []).sort((a,b) => a.year - b.year);

  const objResolutionStateCount = features
    .reduce((stats, {properties}) => {
      stats[properties.resolucio] = stats[properties.resolucio] ? stats[properties.resolucio] + 1 : 1;
      return stats;
    }, {});

  const arrResolutionStateCount = Object.entries(objResolutionStateCount)
    .map(([resolucio, count]) => ({
      name: resolucio,
      value: count
    }));

  return ({
    expedients: features.length,
    typeCountByYear: arrTypeCountByYear,
    resolutionStateCount: arrResolutionStateCount
  });
};

const useStats = (visibleCategories, dateRange, BBOX) => {
  const features = useFilteredExpedients(visibleCategories, dateRange);

  const [stats, setStats] = useState({
    expedients: 0,
    typeCountByYear: [],
    resolutionStateCount: []
  });

  useEffect(() => {
    if (features && BBOX) {
      const [xMin, yMin, xMax, yMax] = BBOX;

      const filteredByBBOX = features.filter(feature => {
        const [x, y] = feature.geometry.coordinates;
        return x >= xMin && x <= xMax && y >= yMin && y <= yMax; // Filter by BBOX
      });
      setStats(_calcStats(filteredByBBOX));
    }
  }, [features, BBOX]);

  return stats;
};

export default useStats;
