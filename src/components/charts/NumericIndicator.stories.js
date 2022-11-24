import React from 'react';
import NumericIndicator from './NumericIndicator';

export default {
  title: 'Common/NumericIndicator',
  component: NumericIndicator,
  argTypes: {
    main: {
      control: { type: 'range', min: 0, max: 10000, step: 1 },
    },
    total: {
      control: { type: 'range', min: 0, max: 10000, step: 1 },
    },
  },
};

const Template = (args) => <NumericIndicator {...args} />;

export const Default = Template.bind({});
Default.args = {
  main: 1234,
  total: 2345
};
