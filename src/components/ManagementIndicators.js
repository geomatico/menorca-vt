import React from 'react';
import PropTypes from 'prop-types';

import config from '../config.json';

import useStats from '../hooks/useStats';
/*import useTotalExpedients from '../hooks/useTotalExpedients';
import useTotalVivendes from '../hooks/useTotalVivendes';*/

/*import ResolutionStateChart from './ResolutionStateChart';
import NumericIndicator from './NumericIndicator';*/
import SectionTitle from './SectionTitle';
import TypeCountByDate from './charts/TypeCountByDate';

const ManagementIndicators = ({visibleCategories, dateRange, BBOX}) => {
  /*const totalExpedients = useTotalExpedients(dateRange, visibleCategories);
  const totalVivendes = useTotalVivendes(BBOX);*/
  const stats = useStats(visibleCategories, dateRange, BBOX);

  const allVisibleCategories = Object.entries(config.datasets).flatMap(([datasetId, {categories}]) =>
    categories.filter(cat => visibleCategories[datasetId].includes(cat.id))
  );

  return <>
    <SectionTitle titleKey="Evolució del nombre d'expedients totals per data d'inici"/>
    <TypeCountByDate categories={allVisibleCategories} data={stats.typeCountByYear}/>
    
    <SectionTitle titleKey="Evolució del nombre d'expedients totals per data de finalització"/>
    <TypeCountByDate categories={allVisibleCategories} data={stats.typeCountByYear}/>

    <SectionTitle titleKey="Temps de tramitació per tipus d'expedients"/>
    <SectionTitle titleKey="Sentit de resolució per tipus d'expedient i any"/>

    {/*<Chart title={'Percentatge de resolució d\'expedients'}>
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
    </Chart>*/}
  </>;
};

ManagementIndicators.propTypes = {
  visibleCategories: PropTypes.object.isRequired,
  dateRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  BBOX: PropTypes.arrayOf(PropTypes.number)
};

export default ManagementIndicators;
