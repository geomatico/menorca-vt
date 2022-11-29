import React from 'react';
import PropTypes from 'prop-types';

import SectionTitle from '../SectionTitle';

import NumericIndicator from '../charts/NumericIndicator';
import GeolocatedExpedients from '../charts/GeolocatedExpedients';

import Box from '@mui/material/Box';
import useStats from '../../hooks/useStats';
import useTotalExpedients from '../../hooks/useTotalExpedients';

const dataGeolocated = [
  {
    type:'DUP',
    label: 'Sí',
    value:10
  },
  {
    type:'DUP',
    label: 'No',
    value:3
  },
  {
    type:'NUI',
    label: 'Sí',
    value:23
  },
  {
    type:'NUI',
    label: 'No',
    value:10
  },
  {
    type:'CED',
    label: 'Sí',
    value:55},
  {
    type:'CED',
    label: 'No',
    value:12
  },
  {
    type:'AUT',
    label: 'Sí',
    value: 45
  },
  {
    type:'AUT',
    label: 'No',
    value: 27
  },
  {
    type:'DTQ',
    label: 'Sí',
    value: 45
  },
  {
    type:'DTQ',
    label: 'No',
    value: 27
  },
  {
    type:'ERE',
    label: 'Sí',
    value: 45
  },
  {
    type:'ERE',
    label: 'No',
    value: 27
  },
  {
    type:'INF',
    label: 'Sí',
    value: 45
  },
  {
    type:'INF',
    label: 'No',
    value: 27
  },
  {
    type:'ORD',
    label: 'Sí',
    value: 45
  },
  {
    type:'ORD',
    label: 'No',
    value: 27
  },
  {
    type:'PO',
    label: 'Sí',
    value: 45
  },
  {
    type:'PO',
    label: 'No',
    value: 27
  }
];
const categoriesGeolocated = [
  {
    id: 'CED',
    color: '#c9c900',
    label: 'CED. Cèdules urbanístiques'
  },
  {
    id: 'DUP',
    color: '#FFFF73',
    label: 'DUP. Expedients de duplicat de cèdules'
  },
  {
    id: 'NUI',
    color: '#E69800',
    label: 'NUI. Declaració interés general'
  },
  {
    id: 'AUT',
    color: '#00C5FF',
    label: 'AUT. Litoral'
  },
  {
    id: 'DTQ',
    color: '#0084A8',
    label: 'DTQ. Declaracio responsable litoral'
  },
  {
    id: 'ERE',
    color: '#FFEBAF',
    label: 'ERE. Edificacions en sòl rúsic'
  },
  {
    id: 'INF',
    color: '#C29ED7',
    label: 'INF. Informes urbanístics i d\'ordenació. Inclou AIA'
  },
  {
    id: 'ORD',
    color: '#E69800',
    label: 'ORD. Expedients diversos ordenació'
  },
  {
    id: 'PO',
    color: '#E60000',
    label: 'PO. Procediments judicials'
  },
];
/*const completenessdata = [
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
];*/

const QualityIndicators = ({visibleCategories, dateRange, BBOX}) => {
  const totalExpedients = useTotalExpedients(dateRange, visibleCategories);
  const stats = useStats(visibleCategories, dateRange, BBOX);

  return <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1}}>
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', boxShadow: 3, borderRadius: 1, p: 2}}>
      <SectionTitle titleKey="Nombre d'expedients total"/>
      <NumericIndicator main={stats.expedients} total={totalExpedients}/>
    </Box>
    {/*  <Box sx={{mr: 1, width: '100%', boxShadow: 3, borderRadius: 1, p: 2}}>
      <SectionTitle titleKey='Completitud dels expedientes'/>
      <DataCompleteness data={completenessdata}/>
    </Box>*/}
    <Box sx={{mr: 1, width: '100%', boxShadow: 3, borderRadius: 1, p: 2}}>
      <SectionTitle titleKey='Expedientes no localizados/localizados' />
      <GeolocatedExpedients data={dataGeolocated} categories={categoriesGeolocated}/>
    </Box>
  </Box>;
};

QualityIndicators.propTypes = {
  visibleCategories: PropTypes.object.isRequired,
  dateRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  BBOX: PropTypes.arrayOf(PropTypes.number)
};

export default QualityIndicators;