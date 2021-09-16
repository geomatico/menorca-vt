import React from 'react';
import PropTypes from 'prop-types';

import {Box, CircularProgress, Typography} from '@material-ui/core';

const NumericIndicator = ({main, total}) => {
  const percent = 100 * main / total;
  return (
    <Box display='flex' flexDirection='column' alignItems='center' style={{position: 'relative'}}>
      <CircularProgress variant="determinate" value={percent} size={200}/>
      <Box display='flex' flexDirection='column' alignItems='center' style={{position: 'absolute', top:65}}>
        <Typography variant="h3" component="div" color="textPrimary">{`${main}`}</Typography>
        <Typography variant="caption" component="div" color="textSecondary">{`de ${total}`}</Typography>
      </Box>
    </Box>
  );
};

NumericIndicator.propTypes = {
  main: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default NumericIndicator;