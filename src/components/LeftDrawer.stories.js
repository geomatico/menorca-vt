import React from 'react';
import LeftDrawer from './LeftDrawer';

export default {
  title: 'Common/LeftDrawer',
  component: LeftDrawer,
};

const Template = (args) => (
  <LeftDrawer {...args} >
    <div style={{width: '90%', height: 100, backgroundColor: 'lightgrey', margin: 10}}></div>
    <div style={{width: '90%', height: 100, backgroundColor: 'lightgrey', margin: 10}}></div>
    <div style={{width: '90%', height: 100, backgroundColor: 'lightgrey', margin: 10}}></div>
  </LeftDrawer>
);

export const Default = Template.bind({});
Default.args = {
  defaultDrawerWidth:300
};