import React from 'react';
import TypeCountByYearChart from './TypeCountByYearChart';

export default {
  title: 'Common/TypeCountByYearChart',
  component: TypeCountByYearChart
};

const Template = args => <TypeCountByYearChart {...args}/>;

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      type: 'DUP',
      year: 1900,
      value: 50
    },
    {
      type: 'DUP',
      year: 1920,
      value: 80
    },
    {
      type: 'DUP',
      year: 1930,
      value: 125
    },
    {
      type: 'CED',
      year: 1900,
      value: 150
    },
    {
      type: 'CED',
      year: 1910,
      value: 250
    },
    {
      type: 'CED',
      year: 1920,
      value: 180
    },
    {
      type: 'CED',
      year: 1930,
      value: 225
    },
    {
      type: 'NUI',
      year: 1900,
      value: 5
    },
    {
      type: 'NUI',
      year: 1910,
      value: 15
    },    {
      type: 'NUI',
      year: 1920,
      value: 50
    },
    {
      type: 'NUI',
      year: 1930,
      value: 75
    },
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
    }
  ]
};