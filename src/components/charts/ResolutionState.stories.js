import React from 'react';
import ResolutionState from './ResolutionState';
import fixture from '../../../fixtures/expedientsFixture.json';

export default {
  title: 'Charts/ResolutionState',
  component: ResolutionState
};

const Template = args => <ResolutionState {...args}/>;

export const Default = Template.bind({});
Default.args = {
  data: fixture
};