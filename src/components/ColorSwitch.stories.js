import React from 'react';
import ColorSwitch from './ColorSwitch';

export default {
  title: 'Common/ColorSwitch',
  component: ColorSwitch,
  argTypes: {
    color: { control: 'color' },
  },
};

const Template = (args) => (
  <ColorSwitch {...args} />
);

export const Default = Template.bind({});
Default.args = {
  color: '#5bd42a',
  checked: true,
  name: 'name'
};
