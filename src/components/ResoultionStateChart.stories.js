import React from 'react';
import ResolutionStateChart from './ResolutionStateChart';

export default {
  title: 'Common/ResolutionStateChart',
  component: ResolutionStateChart,
};

const Template = (args) => <ResolutionStateChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ]
};
