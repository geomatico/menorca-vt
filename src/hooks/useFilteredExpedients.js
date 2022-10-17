import useExpedients from './useExpedients';
import {useMemo} from 'react';
import config from '../config.json';

const useFilteredExpedients = (visibleCategories, dateRange) => {
  const allExpedients = useExpedients();

  const filteredByCategory = useMemo(() => {
    if (!allExpedients) return [];

    const visibleTipus = Object.keys(allExpedients)
      .reduce((visibleTipus, datasetId) => {
        visibleTipus[datasetId] = config.datasets[datasetId].categories
          .filter(({id}) => visibleCategories[datasetId].includes(id))
          .flatMap(({values}) => values);
        return visibleTipus;
      }, {});

    return Object.entries(allExpedients)
      .flatMap(([datasetId, {features}]) =>
        features.filter(({properties}) => visibleTipus[datasetId].includes(properties.tipus))
      );
  }, [allExpedients, visibleCategories]);

  return useMemo(() => filteredByCategory
    .filter(({properties}) => properties.any >= dateRange[0] && properties.any <= dateRange[1]),
  [filteredByCategory, dateRange]);
};

export default useFilteredExpedients;
