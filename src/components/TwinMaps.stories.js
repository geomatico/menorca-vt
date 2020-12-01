import React from 'react';
import TwinMaps from './TwinMaps';

export default {
  title: 'Common/TwinMaps',
  component: TwinMaps,
  decorators: [(Story) => <div style={{ width: '1000px', height: '400px' }}><Story/></div>],
  argTypes: {
    viewport: {control: 'object'},
  },
};

const Template = (args) => <TwinMaps {...args} />;

export const Default = Template.bind({});
Default.args = {
  leftStyle: 'menorca_base_vector.json',
  rightStyle: 'https://geoserveis.icgc.cat/contextmaps/icgc.json',
  initialViewport: {
    latitude: 39.945,
    longitude: 4.060,
    zoom: 9,
    bearing: 0,
    pitch: 0
  }
};
