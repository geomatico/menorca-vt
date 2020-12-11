import React from 'react';
import PropTypes from 'prop-types';

import {Card, CardContent, Typography} from '@material-ui/core';
import ColorSwitch from './ColorSwitch';

function CategoricFilter({ categories, selected, onSelectionChange }) {
  const onSwitch = ({target}) => {
    if (target.checked) {
      onSelectionChange([...selected, target.name]);
    } else {
      onSelectionChange(selected.filter(name => name !== target.name));
    }
  };

  return (
    <Card>
      <CardContent>
        {categories.map(({id, color, label}) => (
          <div key={id}>
            <ColorSwitch color={color} checked={selected.includes(id)} onChange={onSwitch} name={id} />
            <Typography component='span' variant='caption' noWrap>{label}</Typography>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

CategoricFilter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      color: PropTypes.string,
      label: PropTypes.string
    })
  ).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectionChange: PropTypes.func.isRequired
};

export default CategoricFilter;
