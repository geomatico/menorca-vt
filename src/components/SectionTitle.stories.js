import React from 'react';
import SectionTitle from './SectionTitle';

export default {
  title: 'Common/SectionTitle',
  component: SectionTitle,
};

const Template = (args) => (
  <>
    <SectionTitle {...args} />
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur blanditiis cumque dignissimos ducimus ea, eaque eos error eum fuga, fugiat hic ipsam ipsum iste, minus molestiae nisi optio voluptatibus.</p>
  </>
);

export const Default = Template.bind({});
Default.args = {
  title:'Tipo de expediente'
};