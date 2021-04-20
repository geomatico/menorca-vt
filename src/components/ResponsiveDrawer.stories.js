import React from 'react';
import ResponsiveDrawer from './ResponsiveDrawer';

export default {
  title: 'Common/ResponsiveDrawer',
  component: ResponsiveDrawer,
};

const Template = (args) => (
  <ResponsiveDrawer {...args} >
    <div style={{width: '100%', height: 200, backgroundColor: 'lightgrey'}}></div>
    <div style={{width: '100%', height: 50, backgroundColor: 'lightgrey'}}></div>
    <div style={{width: '100%', height: 200, backgroundColor: 'lightgrey'}}></div>
  </ResponsiveDrawer>
);

export const Default = Template.bind({});
Default.args = {
  width: 500,
  isOpen: true,
};