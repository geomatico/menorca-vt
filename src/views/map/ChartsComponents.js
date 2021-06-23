import React from 'react';
import {useSelector} from 'react-redux';

import Chart from '../../components/Chart';
import TypeCountByYearChart from '../../components/TypeCountByYearChart';
import ResolutionStateChart from '../../components/ResolutionStateChart';
import NumericIndicator from '../../components/NumericIndicator';

import {getData, getTotalExpedients} from '../../selectors';
import config from '../../config.json';


const ChartsComponent = () => {
  const {categories} = config;
  const {context} = useSelector(getData);
  const totalExpedients = useSelector(getTotalExpedients);
  
  return <>
    <Chart title={'Nombre d\'expedients per any'}>
      <TypeCountByYearChart categories={categories} data={context.typeCountByYear}/>
    </Chart>
    <Chart title={'Percentatge de resolució d\'expedients'}>
      <ResolutionStateChart data={context.resolutionStateCount}/>
    </Chart>
    <Chart title={'Total d\'expedients'}>
      <NumericIndicator
        main={context.expedients}
        total={totalExpedients}/>
    </Chart>
    <Chart title={'Viviendes vs total locales'}>
      <NumericIndicator title={''} main={parseInt(context.numberofdwellings)} total={parseInt(context.numberofbuildingunits)}/>
    </Chart>
  </>;
};
  
export default ChartsComponent;
