import React from 'react';
import TypeCountByYearChart from './TypeCountByYearChart';
import config from '../config.json';
import fixture from './TypeCountByYearChart.fixture.json';

export default {
  title: 'Common/TypeCountByYearChart',
  component: TypeCountByYearChart,
};

const Template = (args) => <TypeCountByYearChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  categories: config.categories,
  data: fixture.data
};
