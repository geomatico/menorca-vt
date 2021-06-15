import React from 'react';
import ExpandContent from './ExpandContent';
import {Typography} from '@material-ui/core';

export default {
  title: 'Common/ExpandContent',
  component: ExpandContent,
};

const Template = (args) => <ExpandContent {...args} >
  <Typography style={{paddingBottom: 10}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab assumenda
    deserunt esse, fugiat quaerat quis repudiandae? Animi, corporis dicta dolore, eaque et eveniet facilis ipsum iure
    porro quae quibusdam quisquam.</Typography>
</ExpandContent>;

export const Default = Template.bind({});
Default.args = {
  title: 'Tipus d\'expedients',
};
