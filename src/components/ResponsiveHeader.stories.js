import React from 'react';
import ResponsiveHeader from './ResponsiveHeader';

export default {
  title: 'Common/ResponsiveHeader',
  component: ResponsiveHeader,
};

const Template = (args) => (
  <ResponsiveHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Visor d\'expedients',
  drawerWidth: 200
};
