import React from 'react';
import DataCompleteness from './DataCompleteness';

export default {
  title: 'Charts/DataCompleteness',
  component: DataCompleteness
};

const Template = args => <DataCompleteness {...args}/>;

export const Default = Template.bind({});
Default.args = {
  data: [
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
  ]
};