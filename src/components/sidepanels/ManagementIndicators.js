import React, {useState} from 'react';
import PropTypes from 'prop-types';

import config from '../../config.json';
import SectionTitle from '../SectionTitle';
import TypeCountByDate from '../charts/TypeCountByDate';

import SelectInput from '@geomatico/geocomponents/SelectInput';
import Box from '@mui/material/Box';

import AverageProcessingTimeByType from '../charts/AverageProcessingTimeByType';
import ResolutionStateCountByYear from '../charts/ResolutionStateCountByYear';
import ResolutionState from '../charts/ResolutionState';
import useStats from '../../hooks/useStats';
import Typography from '@mui/material/Typography';

const ManagementIndicators = ({visibleCategories, dateRange, BBOX}) => {
  const [startPeriod, setStartPeriod] = useState('year');
  const [endPeriod, setEndPeriod] = useState(config.periodType[0].id);

  const stats = useStats(visibleCategories, dateRange, BBOX);
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
    <Typography variant='h6' color='primary' sx={{ml: 2, fontWeight: 500}}>INDICADORS DE GESTIÓ I TRAMITACIÓ EXPEDIENTS</Typography>
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', boxShadow: 3, borderRadius: 1, p: 2}}>
      <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <SectionTitle titleKey="Expedients iniciats per tipus i"/>
        <SelectInput dense options={config.periodType} selectedOptionId={startPeriod} onOptionChange={setStartPeriod} sx={selectInputSx} menuSx={selectInputMenuSx}/>
      </Box>
      <TypeCountByDate categories={allVisibleCategories} data={stats?.data} filterBy={startPeriod} dataLabel='Any de inici'/>
    </Box>
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', boxShadow: 3, borderRadius: 1, p: 2}}>
      <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <SectionTitle titleKey="Expedients finalitzats per tipus i"/>
        <SelectInput dense options={config.periodType} selectedOptionId={endPeriod} onOptionChange={setEndPeriod}
          sx={selectInputSx} menuSx={selectInputMenuSx}/>
      </Box>
      <TypeCountByDate categories={allVisibleCategories} data={stats?.data} filterBy={endPeriod}  dataLabel='Any de fi'/>
    </Box>

    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', boxShadow: 3, borderRadius: 1, p: 2}}>
      <SectionTitle titleKey="Mitjana del temps de tramitació per tipus i any"/>
      <AverageProcessingTimeByType data={stats.averageProcessingTimeByType} categories={allVisibleCategories}/>
    </Box>
    
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', boxShadow: 3, borderRadius: 1, p: 2}}>
      <SectionTitle titleKey="Evolució de l'estat de resolució per tipus i any"/>
      <ResolutionStateCountByYear data={stats?.resolutionStateCountByYear}/>
    </Box>
    
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', boxShadow: 3, borderRadius: 1, p: 2}}>
      <SectionTitle titleKey="Estat de resolució per tipus (total)"/>
      <ResolutionState data={stats?.resolutionStateCount}/>
    </Box>
  </Box>;
};

ManagementIndicators.propTypes = {
  visibleCategories: PropTypes.object.isRequired,
  dateRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  BBOX: PropTypes.arrayOf(PropTypes.number)
};

export default ManagementIndicators;
