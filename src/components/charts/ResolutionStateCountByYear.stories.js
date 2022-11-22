import React from 'react';
import ResolutionStateCountByYear from './ResolutionStateCountByYear';

export default {
  title: 'Charts/TypeCountByYearChart',
  component: ResolutionStateCountByYear
};

const Template = args => <ResolutionStateCountByYear {...args}/>;

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      type: 'Sense resolució',
      year: 1900,
      value: 50
    },
    {
      type: 'Sense resolució',
      year: 1920,
      value: 80
    },
    {
      type: 'Sense resolució',
      year: 1930,
      value: 125
    },
    {
      type: 'Concedit',
      year: 1900,
      value: 150
    },
    {
      type: 'Concedit',
      year: 1910,
      value: 250
    },
    {
      type: 'Concedit',
      year: 1920,
      value: 180
    },
    {
      type: 'Concedit',
      year: 1930,
      value: 225
    },
    {
      type: 'Denegat',
      year: 1900,
      value: 5
    },
    {
      type: 'Denegat',
      year: 1910,
      value: 15
    },    {
      type: 'Denegat',
      year: 1920,
      value: 50
    },
    {
      type: 'Denegat',
      year: 1930,
      value: 75
    },
    {
      type: 'Concedit',
      year: 1930,
      value: 205
    },
    {
      type: 'Desistit',
      year: 1900,
      value: 15
    },
    {
      type: 'Desistit',
      year: 1910,
      value: 150
    },    {
      type: 'Desistit',
      year: 1920,
      value: 15
    },
    {
      type: 'Desistit',
      year: 1930,
      value: 175
    },
  ],
  categories: [
    {
      id: 'Concedit',
      color: '#17c257',
      label: 'Concedit'
    },
    {
      id: 'Sense resolució',
      color: '#d3d3d3',
      label: 'Sense resolució'
    },
    {
      id: 'Denegat',
      color: '#d70f0f',
      label: 'Denegat'
    },
    {
      id: 'Desistit',
      color: '#d0b400',
      label: 'Denegat'
    }
  ]
};