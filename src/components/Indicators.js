import React from 'react';
import PropTypes from 'prop-types';

import config from '../config.json';

import useStats from '../hooks/useStats';
import useTotalExpedients from '../hooks/useTotalExpedients';
import useTotalVivendes from '../hooks/useTotalVivendes';

import Chart from './Chart';
import TypeCountByYearChart from './TypeCountByYearChart';
import ResolutionStateChart from './ResolutionStateChart';
import NumericIndicator from './NumericIndicator';

const Indicators = ({visibleCategories, dateRange, BBOX}) => {
  const totalExpedients = useTotalExpedients(dateRange, visibleCategories);
  const totalVivendes = useTotalVivendes(BBOX);
  const stats = useStats(visibleCategories, dateRange, BBOX);

  const allVisibleCategories = Object.entries(config.datasets).flatMap(([datasetId, {categories}]) =>
    categories.filter(cat => visibleCategories[datasetId].includes(cat.id))
  );

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
      <NumericIndicator
        main={totalVivendes.numberofdwellings}
        total={totalVivendes.numberofbuildingunits}
      />
    </Chart>
  </>;
};

Indicators.propTypes = {
  visibleCategories: PropTypes.object.isRequired,
  dateRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  BBOX: PropTypes.arrayOf(PropTypes.number)
};

export default Indicators;
