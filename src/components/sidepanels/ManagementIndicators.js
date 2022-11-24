import React, {useState} from 'react';
import PropTypes from 'prop-types';

import config from '../../config.json';

import useStats from '../../hooks/useStats';
/*import useTotalExpedients from '../hooks/useTotalExpedients';
import useTotalVivendes from '../hooks/useTotalVivendes';*/

import SectionTitle from '../SectionTitle';
import TypeCountByDate from '../charts/TypeCountByDate';
/*import AverageProcessingTimeByType from './charts/AverageProcessingTimeByType';
import ResolutionStateCountByYear from './charts/ResolutionStateCountByYear';*/

import expedientsFixture from '../../../fixtures/expedientsFixture.json';
import SelectInput from '@geomatico/geocomponents/SelectInput';
import Box from '@mui/material/Box';
import AverageProcessingTimeByType from '../charts/AverageProcessingTimeByType';
import ResolutionStateCountByYear from '../charts/ResolutionStateCountByYear';
import ResolutionState from '../charts/ResolutionState';

const ManagementIndicators = ({visibleCategories, dateRange, BBOX}) => {
  const [startPeriod, setStartPeriod] = useState (config.periodType[0].id);
  const [endPeriod, setEndPeriod] = useState (config.periodType[0].id);
  /*const totalExpedients = useTotalExpedients(dateRange, visibleCategories);
  const totalVivendes = useTotalVivendes(BBOX);*/
  const stats = useStats(visibleCategories, dateRange, BBOX);
  console.log('stats', stats);
  const allVisibleCategories = Object.entries(config.datasets).flatMap(([datasetId, {categories}]) =>
    categories.filter(cat => visibleCategories[datasetId].includes(cat.id))
  );

  const selectInputSx = {
    ml: 1, 
    mb: 1, 
    mt: 0.5, 
    '& .SelectInput-select': {
      fontSize: theme => theme.typography.caption, 
      fontWeight: 'bold', 
      textTransform: 'uppercase'
    },
  };

  const selectInputMenuSx = {
    '& .SelectInput-menuItem': {
      fontSize: theme => theme.typography.caption,
      fontWeight: 'bold',
      textTransform: 'uppercase'
    }
  };
  
  return <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1}}>
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', boxShadow: 3, borderRadius: 1, p: 1}}>
      <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <SectionTitle titleKey="Expedients iniciats per tipus i"/>
        <SelectInput dense options={config.periodType} selectionOptionId={startPeriod} onOptionChange={setStartPeriod}
          sx={selectInputSx} menuSx={selectInputMenuSx}/>
      </Box>
      <TypeCountByDate categories={allVisibleCategories} data={expedientsFixture} dataLabel='Any de inici'/>
    </Box>

    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', boxShadow: 3, borderRadius: 1, p: 1}}>
      <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <SectionTitle titleKey="Expedients finalitzats per tipus i"/>
        <SelectInput dense options={config.periodType} selectionOptionId={endPeriod} onOptionChange={setEndPeriod}
          sx={selectInputSx} menuSx={selectInputMenuSx}/>
      </Box>
      <TypeCountByDate categories={allVisibleCategories} data={expedientsFixture} dataLabel='Any de fi'/>
    </Box>
      
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', boxShadow: 3, borderRadius: 1, p: 1}}>
      <SectionTitle titleKey="Mitjana del temps de tramitació per any i tipus"/>
      <AverageProcessingTimeByType data={expedientsFixture}/>
    </Box>
    
    <Box sx={{display: 'flex', flexDirection: 'row'}}>
      <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'space-between', gap: 2}}>
        <Box sx={{display: 'flex', flexGrow: 2, flexDirection: 'column', alignItems: 'flex-start', width: '100%', boxShadow: 3, borderRadius: 1, p: 1}}>
          <SectionTitle titleKey="Evolució de estat de resolució per tipus i any"/>
          <ResolutionStateCountByYear data={expedientsFixture}/>
        </Box>
      
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', boxShadow: 3, borderRadius: 1, p: 1}}>
          <SectionTitle titleKey="Estat de resolució per tipus (total)"/>
          <ResolutionState data={expedientsFixture}/>
        </Box>
      </Box>
    </Box>
  </Box>;
};

ManagementIndicators.propTypes = {
  visibleCategories: PropTypes.object.isRequired,
  dateRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  BBOX: PropTypes.arrayOf(PropTypes.number)
};

export default ManagementIndicators;
