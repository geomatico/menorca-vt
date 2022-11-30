import React from 'react';
import GeolocatedExpedients from './GeolocatedExpedients';

export default {
  title: 'Charts/GeolocatedExpedients',
  component: GeolocatedExpedients
};

const Template = args => <GeolocatedExpedients {...args}/>;

export const Default = Template.bind({});
Default.args = {
  data: [
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
  ],
  categories: [
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
  ]
};