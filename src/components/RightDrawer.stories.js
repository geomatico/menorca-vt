import React from 'react';
import RightDrawer from './RightDrawer';

export default {
  title: 'Common/RightDrawer',
  component: RightDrawer,
};

const Template = (args) => (
  <RightDrawer {...args} >
    <div style={{width: '100%', height: 200, backgroundColor: 'lightgrey'}}></div>
    <div style={{width: '100%', height: 50, backgroundColor: 'lightgrey'}}></div>
    <div style={{width: '100%', height: 200, backgroundColor: 'lightgrey'}}></div>
  </RightDrawer>
);

export const Default = Template.bind({});
Default.args = {
  width: 350,
  isOpen: true,
};