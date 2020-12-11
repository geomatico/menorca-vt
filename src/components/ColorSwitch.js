import React from 'react';
import PropTypes from 'prop-types';

import {makeStyles} from '@material-ui/core/styles';
import {Switch} from '@material-ui/core';

const useStyles = makeStyles({
  switchBase: {
    color: '#CCCCCC',
  },
  checked: {
    color: ({color}) => color,
  },
  track: {
    backgroundColor: ({checked, color}) => checked ? color : '#CCCCCC',
  },
});

function ColorSwitch({color, checked, name, onChange}) {
  const classes = useStyles({checked, color});
  return <Switch color='default' size='small' classes={classes} checked={checked} name={name} onChange={onChange} />;
}

ColorSwitch.propTypes = {
  color: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ColorSwitch;
