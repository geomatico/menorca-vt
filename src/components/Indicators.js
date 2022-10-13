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

const Indicators = ({dateRange, BBOX, visibleCategories, renderedFeatures}) => {

  const totalExpedients = useTotalExpedients(dateRange, visibleCategories);
  const totalVivendes = useTotalVivendes(BBOX);
  const stats = useStats(renderedFeatures);

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
  dateRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  BBOX: PropTypes.string,
  visibleCategories: PropTypes.object.isRequired,
  renderedFeatures: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Indicators;