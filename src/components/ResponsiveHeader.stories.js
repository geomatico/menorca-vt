import React from 'react';
//MUI
import MenuIcon from '@mui/icons-material/Menu';
//MENORCA-VT
import ResponsiveHeader from './ResponsiveHeader';
import LogoBlanco from './LogoBlanco';

export default {
  title: 'Common/ResponsiveHeader',
  component: ResponsiveHeader,
};

const Template = (args) => (
  <ResponsiveHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  startIcon: <MenuIcon color='secondary'/>,
  title: 'Visor d\'expedients',
  logo: <LogoBlanco/>,
};
