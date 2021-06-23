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
  
  return({
    expedients: featureProperties.length,
    typeCountByYear: arrTypeCountByYear,
    resolutionStateCount: arrResolutionStateCount
  });
};
