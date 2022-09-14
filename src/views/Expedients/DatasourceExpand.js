import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import SwitchPad from '@geomatico/geocomponents/SwitchPad';
import ExpandContent from '../../components/ExpandContent';
import config from '../../config.json';

const switchPadStyle = {
  '& .SwitchPad-text': {
    fontSize: '0.75rem'
  }
};

const DatasourceExpand = ({id, onVisibilityChanged}) => {
  const {title, categories} = config.datasources[id];
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

DatasourceExpand.propTypes = {
  id: PropTypes.string.isRequired,
  onVisibilityChanged: PropTypes.func.isRequired
};

export default DatasourceExpand;
