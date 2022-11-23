import React from 'react';
import ResolutionStateCountByYear from './ResolutionStateCountByYear';
import fixture from '../../../fixtures/expedientsFixture.json';

export default {
  title: 'Charts/TypeCountByYearChart',
  component: ResolutionStateCountByYear
};

const Template = args => <ResolutionStateCountByYear {...args}/>;

export const Default = Template.bind({});
Default.args = {
  data: fixture,
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