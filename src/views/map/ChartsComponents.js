import React from 'react';
import {useSelector} from 'react-redux';

import Chart from '../../components/Chart';
import TypeCountByYearChart from '../../components/TypeCountByYearChart';
import ResolutionStateChart from '../../components/ResolutionStateChart';
import NumericIndicator from '../../components/NumericIndicator';

import {
  getData,
  getExpedientsCiutadellaVisible,
  getExpedientsConsellVisible, getSelectedCiutadellaCategories,
  getSelectedConsellCategories,
  getTotalExpedients
} from '../../selectors';
import config from '../../config.json';


const ChartsComponent = () => {
  const {consellCategories, ciutadellaCategories} = config;
  const {context} = useSelector(getData);
  const totalExpedients = useSelector(getTotalExpedients);

  const isExpedientsConsellVisible = useSelector(getExpedientsConsellVisible);
  const selectedConsellCategories = useSelector(getSelectedConsellCategories);
  const isExpedientsCiutadellaVisible = useSelector(getExpedientsCiutadellaVisible);
  const selectedCiutadellaCategories = useSelector(getSelectedCiutadellaCategories);

  const allVisibleCategories = [
    ...(isExpedientsConsellVisible ? consellCategories.filter(cat => selectedConsellCategories.includes(cat.id)) : []),
    ...(isExpedientsCiutadellaVisible ? ciutadellaCategories.filter(cat => selectedCiutadellaCategories.includes(cat.id)) : [])
  ];

  return <>
    <Chart title={'Tipus d\'expedient per any'}>
      <TypeCountByYearChart categories={allVisibleCategories} data={context.typeCountByYear}/>
    </Chart>
    <Chart title={'Percentatge de resolució d\'expedients'}>
      <ResolutionStateChart data={context.resolutionStateCount}/>
    </Chart>
    <Chart title={'Expedients mostrats vs total del consell'}>
      <NumericIndicator
        main={context.expedients}
        total={totalExpedients}/>
    </Chart>

    <Chart title={'Vivendes vs total locals'}>
      <NumericIndicator title={''} main={parseInt(context.numberofdwellings)} total={parseInt(context.numberofbuildingunits)}/>
    </Chart>
  </>;
};

export default ChartsComponent;
