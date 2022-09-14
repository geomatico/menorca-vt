import React, {useEffect, useState} from 'react';

import Chart from './Chart';
import TypeCountByYearChart from './TypeCountByYearChart';
import ResolutionStateChart from './ResolutionStateChart';
import NumericIndicator from './NumericIndicator';

import useFetch from '@geomatico/geocomponents/hooks/useFetch';

import config from '../config.json';
import PropTypes from 'prop-types';
import API from '../services/api';
import {calcStats} from '../services/calcStats';

const AllCharts = ({dateRange, BBOX, visibleCategories, renderedFeatures}) => {

  const allVisibleCategories = Object.entries(config.datasources).flatMap(([datasource, {categories}]) =>
    categories.filter(cat => visibleCategories[datasource].includes(cat.id))
  );

  // Calc stats
  const [stats, setStats] = useState({
    expedients: 0,
    typeCountByYear: [],
    resolutionStateCount: []
  });

  useEffect(() => setStats(calcStats(renderedFeatures.map(f => f.properties))), [renderedFeatures]);

  // Query total expedients
  const {data: expedientsResponse} = useFetch(API.expedients(...dateRange));
  const [totalExpedients, setTotalExpedients] = useState(0);
  useEffect(() => {
    if (expedientsResponse) {
      setTotalExpedients(
        expedientsResponse
          ?.filter(({tipus}) => config.datasources.consell.categories.find(category => visibleCategories.consell.includes(category.id) && category.values.includes(tipus)))
          .reduce((data, {totals}) => data + parseInt(totals), 0)
      );
    }
  },[expedientsResponse]);

  // Query total vivendes
  const {data: vivendesResponse} = useFetch(BBOX && API.vivendes(BBOX));
  const [totalVivendes, setTotalVivendes] = useState({numberofdwellings: '0', numberofbuildingunits: '0'});
  useEffect(() => {
    if (vivendesResponse) {
      setTotalVivendes(vivendesResponse[0]);
    }
  }, [vivendesResponse]);


  return <>
    <Chart title={'Tipus d\'expedient per any'}>
      <TypeCountByYearChart categories={allVisibleCategories} data={stats.typeCountByYear}/>
    </Chart>
    <Chart title={'Percentatge de resolució d\'expedients'}>
      <ResolutionStateChart data={stats.resolutionStateCount}/>
    </Chart>
    <Chart title={'Expedients mostrats vs total del consell'}>
      <NumericIndicator
        main={stats.expedients}
        total={totalExpedients}/>
    </Chart>

    <Chart title={'Vivendes vs total locals'}>
      <NumericIndicator title={''} main={parseInt(totalVivendes.numberofdwellings)} total={parseInt(totalVivendes.numberofbuildingunits)}/>
    </Chart>
  </>;
};

AllCharts.propTypes = {
  dateRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  BBOX: PropTypes.string,
  visibleCategories: PropTypes.object.isRequired,
  renderedFeatures: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default AllCharts;
