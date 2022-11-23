import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const SectionTitle = ({titleKey}) => {
  return <Box mb={1} >
    <Typography
      variant='caption'
      sx={{mt: 3, fontWeight: 'bold', textTransform: 'uppercase'}}
    >
      {titleKey}
    </Typography>
  </Box>;
};

SectionTitle.propTypes = {
  titleKey: PropTypes.string.isRequired,
};

export default SectionTitle;