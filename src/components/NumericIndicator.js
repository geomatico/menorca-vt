import React from 'react';
import PropTypes from 'prop-types';

import {Box, CircularProgress, Typography} from '@material-ui/core';

const NumericIndicator = ({title, main, total}) => {
  const percent = 100 * main / total;
  return (<>
    <Typography variant="h6" style={{margin: 8}}>{title}</Typography>
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" value={percent} size={200} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        flexDirection="column"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h3" component="div" color="textPrimary">{`${main}`}</Typography>
        <Typography variant="caption" component="div" color="textSecondary">{`de ${total}`}</Typography>
      </Box>
    </Box>
  </>);
};

NumericIndicator.propTypes = {
  title: PropTypes.string.isRequired,
  main: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default NumericIndicator;
