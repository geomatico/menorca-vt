import {useEffect, useState} from 'react';
import useFilteredExpedients from './useFilteredExpedients';
import {getAverageProcessingTimeByType} from '../calculations/getAverageProcessingTimeByType';
import {getResolutionState} from '../calculations/getResolutionState';
import {getStatusCountByYear} from '../calculations/getStatusCountByYear';
import {getTypeCountByEndDate} from '../calculations/getTypeCountByEndDate';
import {getTypeCountByStartDate} from '../calculations/getTypeCountByStartDate';
import {getGeolocatedExpedients} from '../calculations/getGeolocatedExpedients';

const _calcStats = (features) => {
/*  const arrTypeCountByYear = features
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
    }, []).sort((a,b) => a.year - b.year);*/

  /*
    const objResolutionStateCount = features
      .reduce((stats, {properties}) => {
        stats[properties.resolucio] = stats[properties.resolucio] ? stats[properties.resolucio] + 1 : 1;
        return stats;
      }, {});
  */

  /*  const arrResolutionStateCount = Object.entries(objResolutionStateCount)
      .map(([resolucio, count]) => ({
        name: resolucio,
        value: count
      }));*/

  const d = features.map(el => el.properties);

  // quality
  const arrCompletenessdata=getGeolocatedExpedients(d);
  //management
  const arrTypeCountByStartDate = getTypeCountByStartDate(d);
  const arrTypeCountByEndDate = getTypeCountByEndDate(d);
  const arrAverageProcessingTimeByType = getAverageProcessingTimeByType(d);
  const arrStatusCountByYear = getStatusCountByYear(d);
  const arrResolutionStateCount = getResolutionState(d);

  return ({
    expedients: features.length,
    //typeCountByYear: arrTypeCountByYear,
    //resolutionStateCount: arrResolutionStateCount,

    // nuevos cualculos quality
    completenessData : arrCompletenessdata,

    // nuevos calculos management
    averageProcessingTimeByType: arrAverageProcessingTimeByType,
    resolutionStateCount: arrResolutionStateCount,
    typeCountByEndDate: arrTypeCountByEndDate,
    typeCountByStartDate: arrTypeCountByStartDate,

    // no funciona
    resolutionStateCountByYear: arrStatusCountByYear,

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
