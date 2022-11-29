import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import SectionTitle from '../SectionTitle';

import NumericIndicator from '../charts/NumericIndicator';
import GeolocatedExpedients from '../charts/GeolocatedExpedients';

import Box from '@mui/material/Box';
import useStats from '../../hooks/useStats';
import useTotalExpedients from '../../hooks/useTotalExpedients';
import {getGeolocatedExpedients} from '../../calculations/getGeolocatedExpedients';
import config from '../../config.json';
import useGeolocatedExpedients from '../../hooks/useGeolocatedExpedients';

const QualityIndicators = ({visibleCategories, dateRange, BBOX}) => {
  const totalExpedients = useTotalExpedients(dateRange, visibleCategories);

  // Esto es para el indicador de expedientes totales, que usa SOLO los del consell
  const visibleCategoriesConsellOnly = useMemo(()=> ({consell: visibleCategories.consell, ciutadella: []}), [visibleCategories]);
  const statsConsellOnly = useStats(visibleCategoriesConsellOnly, dateRange, BBOX);

  const allVisibleCategories = Object.entries(config.datasets).flatMap(([datasetId, {categories}]) =>
    categories.filter(cat => visibleCategories[datasetId].includes(cat.id))
  );

  // a traves de un endpoint aparte, calcula expdientes geolocalizados, por tipo y fecha.
  const dataGeolocated = getGeolocatedExpedients(useGeolocatedExpedients(visibleCategories, dateRange));

  return <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1}}>
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', boxShadow: 3, borderRadius: 1, p: 2}}>
      <SectionTitle titleKey="Nombre d'expedients total (Consell)"/>
      <NumericIndicator main={statsConsellOnly.expedients} total={totalExpedients}/>
    </Box>
    {/*  <Box sx={{mr: 1, width: '100%', boxShadow: 3, borderRadius: 1, p: 2}}>
      <SectionTitle titleKey='Completitud dels expedientes'/>
      <DataCompleteness data={completenessdata}/>
    </Box>*/}
    <Box sx={{mr: 1, width: '100%', boxShadow: 3, borderRadius: 1, p: 2}}>
      <SectionTitle titleKey='Expedientes no localizados/localizados' />
      <GeolocatedExpedients data={dataGeolocated} categories={allVisibleCategories}/>
    </Box>
  </Box>;
};

QualityIndicators.propTypes = {
  visibleCategories: PropTypes.object.isRequired,
  dateRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  BBOX: PropTypes.arrayOf(PropTypes.number)
};

export default QualityIndicators;