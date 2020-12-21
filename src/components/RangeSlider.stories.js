import React, {useState} from 'react';
import RangeSlider from './RangeSlider';

export default {
  title: 'Common/RangeSlider',
  component: RangeSlider,
};

const Template = (args) => <RangeSlider {...args} />;

// eslint-disable-next-line react/prop-types,no-unused-vars
const ManagedValueTemplate = ({value, onValueChange, ...args}) => {
  const [getValue, setValue] = useState(value);
  return <RangeSlider value={getValue} onValueChange={setValue} {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  min: 1980,
  max: 2010,
  value: [1990, 2000]
};

export const Managed = ManagedValueTemplate.bind({});
Managed.args = Default.args;
