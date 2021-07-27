import React from 'react';
import LlicenciesMap from './LlicenciesMap';

export default {
  title: 'Formacio/LlicenciesMap',
  decorators: [(Story) => <div style={{width: '800px', height: '500px'}}><Story/></div>],
  component: LlicenciesMap,
};

const Template = (args) => <LlicenciesMap {...args} />;

export const Default = Template.bind({});
Default.args = {
};
