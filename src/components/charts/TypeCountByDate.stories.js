import React from 'react';
import TypeCountByDate from './TypeCountByDate';
import fixture from '../../../fixtures/expedientsFixture.json';

export default {
  title: 'Charts/TypeCountByDate',
  component: TypeCountByDate
};

const Template = args => <TypeCountByDate {...args}/>;

export const Default = Template.bind({});
Default.args = {
  dataLabel: 'Any de fi',
  data: fixture,
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