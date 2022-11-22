import React from 'react';
import TypeCountByDate from './TypeCountByDate';

export default {
  title: 'Charts/TypeCountByDate',
  component: TypeCountByDate
};

const Template = args => <TypeCountByDate {...args}/>;

export const Default = Template.bind({});
Default.args = {
  dataLabel: 'Any de fi',
  data: [
    {
      type: 'DUP',
      date: 1900,
      value: 50
    },
    {
      type: 'DUP',
      date: 1920,
      value: 80
    },
    {
      type: 'DUP',
      date: 1930,
      value: 125
    },
    {
      type: 'CED',
      date: 1900,
      value: 150
    },
    {
      type: 'CED',
      date: 1910,
      value: 250
    },
    {
      type: 'CED',
      date: 1920,
      value: 180
    },
    {
      type: 'CED',
      date: 1930,
      value: 225
    },
    {
      type: 'NUI',
      date: 1900,
      value: 5
    },
    {
      type: 'NUI',
      date: 1910,
      value: 15
    },    {
      type: 'NUI',
      date: 1920,
      value: 50
    },
    {
      type: 'NUI',
      date: 1930,
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