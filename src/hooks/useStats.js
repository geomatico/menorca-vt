import {useEffect, useMemo, useState} from 'react';
import useExpedients from './useExpedients';
import config from '../config.json';

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

const useStats = (dateRange, BBOX, visibleCategories) => {
  const expedients = useExpedients();

  const filteredByCategoryFeatures = useMemo(() => {
    if (!expedients) return [];

    const visibleTipus = Object.keys(expedients)
      .reduce((visibleTipus, datasetId) => {
        visibleTipus[datasetId] = config.datasets[datasetId].categories
          .filter(({id}) => visibleCategories[datasetId].includes(id))
          .flatMap(({values}) => values);
        return visibleTipus;
      }, {});

    return Object.entries(expedients)
      .flatMap(([datasetId, {features}]) =>
        features.filter(feature => {
          return visibleTipus[datasetId].includes(feature.properties.tipus);
        })
      );
  }, [expedients, visibleCategories]);

  const filteredByTimeFeatures = useMemo(() => filteredByCategoryFeatures
    .filter(({properties}) => properties.any >= dateRange[0] && properties.any <= dateRange[1]),
  [dateRange, filteredByCategoryFeatures]);

  const [stats, setStats] = useState({
    expedients: 0,
    typeCountByYear: [],
    resolutionStateCount: []
  });

  useEffect(() => {
    if (filteredByTimeFeatures && BBOX) {
      const [xMin, yMin, xMax, yMax] = BBOX;

      const filteredFeatures = filteredByTimeFeatures.filter(feature => {
        const [x, y] = feature.geometry.coordinates;
        return x >= xMin && x <= xMax && y >= yMin && y <= yMax; // Feature within BBOX
      });
      setStats(_calcStats(filteredFeatures));
    }

  }, [filteredByTimeFeatures, BBOX]);

  return stats;
};

export default useStats;
