import React from 'react';
//MENORCA-VT
import TypeCountByYearChart from './TypeCountByYearChart';
//UTILS
import config from '../config.json';
import fixture from './TypeCountByYearChart.fixture.json';

export default {
  title: 'Common/TypeCountByYearChart',
  component: TypeCountByYearChart,
};

const Template = (args) => <TypeCountByYearChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  categories: config.consellCategories,
  data: fixture.data
};
