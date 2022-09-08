import React from 'react';
//MUI-ICONS
import FilterListIcon from '@mui/icons-material/FilterList';
//MENORCA-VT
import SquareButtonIcon from './SquareButtonIcon';

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