export const calcStats = (featureProperties) => {

  const objTypeCountByYear = featureProperties
    .reduce((stats, properties) => {
      const year = properties.any;
      const type = properties.tipus;

      stats[year] = stats[year] || {};
      stats[year][type] = stats[year][type] ? stats[year][type] + 1 : 1;
      return stats;
    }, {});

  const arrTypeCountByYear = Object.keys(objTypeCountByYear)
    .map(year => ({
      year: year,
      ...objTypeCountByYear[year]
    }));

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
