import React from 'react';
import AverageProcessingTimeByType from './AverageProcessingTimeByType';

export default {
  title: 'Charts/AverageProcessingTimeByType',
  component: AverageProcessingTimeByType
};

const Template = args => <AverageProcessingTimeByType {...args}/>;

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      type: 'DUP',
      value: 330
    },
    {
      type: 'NUI',
      value: 61
    },
    {
      type: 'CED',
      value: 182
    },
  ],
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