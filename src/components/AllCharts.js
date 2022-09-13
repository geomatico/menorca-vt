import React from 'react';

import Chart from './Chart';
import TypeCountByYearChart from './TypeCountByYearChart';
import ResolutionStateChart from './ResolutionStateChart';
import NumericIndicator from './NumericIndicator';

import config from '../config.json';
import PropTypes from 'prop-types';


const ChartsComponent = ({stats, totalViviendas, totalExpedients, isExpedientsConsellVisible, selectedConsellCategories, isExpedientsCiutadellaVisible, selectedCiutadellaCategories}) => {
  const {consellCategories, ciutadellaCategories} = config;

  const allVisibleCategories = [
    ...(isExpedientsConsellVisible ? consellCategories.filter(cat => selectedConsellCategories.includes(cat.id)) : []),
    ...(isExpedientsCiutadellaVisible ? ciutadellaCategories.filter(cat => selectedCiutadellaCategories.includes(cat.id)) : [])
  ];

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
      <NumericIndicator title={''} main={parseInt(totalViviendas.numberofdwellings)} total={parseInt(totalViviendas.numberofbuildingunits)}/>
    </Chart>
  </>;
};

ChartsComponent.propTypes = {
  stats: PropTypes.shape({
    expedients: PropTypes.number.isRequired,
    typeCountByYear: PropTypes.array.isRequired,
    resolutionStateCount: PropTypes.array.isRequired,
  }).isRequired,
  totalViviendas: PropTypes.shape({
    numberofdwellings: PropTypes.string.isRequired,
    numberofbuildingunits: PropTypes.string.isRequired
  }).isRequired,
  totalExpedients: PropTypes.number.isRequired,
  isExpedientsConsellVisible: PropTypes.bool.isRequired,
  selectedConsellCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  isExpedientsCiutadellaVisible: PropTypes.bool.isRequired,
  selectedCiutadellaCategories: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ChartsComponent;
