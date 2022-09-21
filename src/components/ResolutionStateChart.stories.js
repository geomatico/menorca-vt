import React from 'react';
import ResolutionStateChart from './ResolutionStateChart';

export default {
  title: 'Common/ResolutionStateChart',
  component: ResolutionStateChart
};

const Template = args => <ResolutionStateChart {...args}/>;

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      name: 'A',
      value: 200
    },
    {
      name: 'B',
      value: 100
    },
    {
      name: 'C',
      value: 30
    },
    {
      name: 'D',
      value: 250
    },
  ]

};