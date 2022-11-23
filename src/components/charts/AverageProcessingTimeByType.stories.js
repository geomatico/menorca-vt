import React from 'react';
import AverageProcessingTimeByType from './AverageProcessingTimeByType';

import fixture from '../../../fixtures/expedientsFixture.json';

export default {
  title: 'Charts/AverageProcessingTimeByType',
  component: AverageProcessingTimeByType
};

const Template = args => <AverageProcessingTimeByType {...args}/>;

export const Default = Template.bind({});
Default.args = {
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