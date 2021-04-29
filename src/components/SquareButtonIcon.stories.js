import React from 'react';
import SquareButtonIcon from './SquareButtonIcon';
import FilterListIcon from '@material-ui/icons/FilterList';

export default {
  title: 'Common/SquareButtonIcon',
  component: SquareButtonIcon,
};

const Template = (args) => (
  <SquareButtonIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: <FilterListIcon/>
};