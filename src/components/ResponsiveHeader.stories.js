import React from 'react';
import ResponsiveHeader from './ResponsiveHeader';

import MenuIcon from '@material-ui/icons/Menu';
import LogoBlanco from '../../static/img/LogoBlanco';

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
