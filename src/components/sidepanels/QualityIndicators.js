import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import SectionTitle from '../SectionTitle';

import NumericIndicator from '../charts/NumericIndicator';
import GeolocatedExpedients from '../charts/GeolocatedExpedients';

import Box from '@mui/material/Box';
import useStats from '../../hooks/useStats';
import useTotalExpedients from '../../hooks/useTotalExpedients';
import {getGeolocatedExpedientsByType} from '../../calculations/getGeolocatedExpedientsByType';
import config from '../../config.json';
import useGeolocatedExpedients from '../../hooks/useGeolocatedExpedients';
import Typography from '@mui/material/Typography';
import DataCompleteness from '../charts/DataCompleteness';

const completenessdata = [
  {
    type:'Resolució',
    label: 'Sí',
    value: 100
  },
  {
    type:'Data inici',
    label: 'Sí',
    value: 33
  },
  {
    type:'Data fi',
    label: 'Sí',
    value: 45
  },
  {
    type:'Ref. Cadastral',
    label: 'Sí',
    value: 74
  },
  {
    type:'Pressupost',
    label: 'Sí',
    value: 33
  },
  {
    type:'Superfície',
    label: 'Sí',
    value: 50
  },
  {
    type:'Resolució',
    label: 'No',
    value: 10
  },
  {
    type:'Data inici',
    label: 'No',
    value: 25
  },
  {
    type:'Data fi',
    label: 'No',
    value: 15
  },
  {
    type:'Ref. Cadastral',
    label: 'No',
    value: 10
  },
  {
    type:'Pressupost',
    label: 'No',
    value: 10
  },
  {
    type:'Superfície',
    label: 'No',
    value: 12
  },
];

const QualityIndicators = ({visibleCategories, dateRange, BBOX}) => {
  const totalExpedients = useTotalExpedients(dateRange, visibleCategories);

  // Esto es para el indicador de expedientes totales, que usa SOLO los del consell
  const visibleCategoriesConsellOnly = useMemo(()=> ({consell: visibleCategories.consell, ciutadella: []}), [visibleCategories]);
  const statsConsellOnly = useStats(visibleCategoriesConsellOnly, dateRange, BBOX);

  const allVisibleCategories = Object.entries(config.datasets).flatMap(([datasetId, {categories}]) =>
    categories.filter(cat => visibleCategories[datasetId].includes(cat.id))
  );

  // a traves de un endpoint aparte, calcula expdientes geolocalizados, por tipo y fecha.
  const dataGeolocated = getGeolocatedExpedientsByType(useGeolocatedExpedients(visibleCategories, dateRange));

  return <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1, flexWrap: 'wrap'}}>
    <Typography variant='h6' color='primary' sx={{ml: 2, fontWeight: 500}}>INDICADORS DE QUALITAT DE LES DADES</Typography>
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', boxShadow: 3, borderRadius: 1, p: 2}}>
      <SectionTitle titleKey="Nombre d'expedients total (Consell)"/>
      <NumericIndicator main={statsConsellOnly.expedients} total={totalExpedients}/>
    </Box>
    <Box sx={{mr: 1, width: '100%', boxShadow: 3, borderRadius: 1, p: 2}}>
      <SectionTitle titleKey='Expedients no localizats i localizats' />
      <GeolocatedExpedients data={dataGeolocated} categories={allVisibleCategories}/>
    </Box>
    <Box sx={{mr: 1, width: '100%', boxShadow: 3, borderRadius: 1, p: 2}}>
      <SectionTitle titleKey='Completitud dels expedientes (DATOS DEMO)'/>
      <DataCompleteness data={completenessdata}/>
    </Box>
  </Box>;
};

QualityIndicators.propTypes = {
  visibleCategories: PropTypes.object.isRequired,
  dateRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  BBOX: PropTypes.arrayOf(PropTypes.number)
};

export default QualityIndicators;