import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const RangeSlider = ({min, max, value, onValueChange}) => {
  const handleChange = (event, newValue) => {
    onValueChange(newValue);
  };

  return (
    <div>
      <Slider
        step={1}
        marks
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        color="secondary"
      />
      <Typography variant="caption" align="center" component="div">
        &gt; {value[0]} - {value[1]} &lt;
      </Typography>
    </div>
  );
};

RangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  onValueChange: PropTypes.func.isRequired
};

export default RangeSlider;
