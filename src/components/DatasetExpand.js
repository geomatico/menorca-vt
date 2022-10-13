import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import SwitchPad from '@geomatico/geocomponents/SwitchPad';

import config from '../config.json';
import ExpandContent from './ExpandContent';

const switchPadStyle = {
  '& .SwitchPad-text': {
    fontSize: '0.75rem',
    ml: 1
  }
};

const DatasetExpand = ({id, onVisibilityChanged}) => {
  const {title, categories} = config.datasets[id];
  const [isChecked, setChecked] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState(categories.map(c => c.id));
  useEffect(() =>
    onVisibilityChanged(isChecked ? selectedCategories : []),
  [isChecked, selectedCategories]
  );

  return <ExpandContent title={title} isChecked={isChecked} onChange={setChecked}>
    <SwitchPad
      categories={categories}
      selected={selectedCategories}
      onSelectionChange={setSelectedCategories}
      sx={switchPadStyle}
    />
  </ExpandContent>;
};

DatasetExpand.propTypes = {
  id: PropTypes.string.isRequired,
  onVisibilityChanged: PropTypes.func.isRequired
};

export default DatasetExpand;
