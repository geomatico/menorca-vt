import React, {useState} from 'react';
import CategoricFilter from './CategoricFilter';

export default {
  title: 'Common/CategoricFilter',
  component: CategoricFilter,
};

const Template = (args) => <CategoricFilter {...args} />;

// eslint-disable-next-line react/prop-types,no-unused-vars
const ManagedCategoriesTemplate = ({selected, onSelectionChange, ...args}) => {
  const [getSelected, setSelected] = useState(selected);
  return <CategoricFilter selected={getSelected} onSelectionChange={setSelected} {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  categories: [{
    id: 'C1',
    color: '#C9C900',
    label: 'Categoria 1'
  }, {
    id: 'C2',
    color: '#00C5FF',
    label: 'Categoria 2'
  }],
  selected: ['C1', 'C2']
};

export const Managed = ManagedCategoriesTemplate.bind({});
Managed.args = Default.args;
