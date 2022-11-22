import React from 'react';
import ResolutionState from './ResolutionState';

export default {
  title: 'Charts/ResolutionState',
  component: ResolutionState
};

const Template = args => <ResolutionState {...args}/>;

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      label: 'Sense resolució',
      value: 200
    },
    {
      label: 'Concedit',
      value: 100
    },
    {
      label: 'Denegat',
      value: 30
    },
    {
      label: 'Desistit',
      value: 250
    },
  ]

};