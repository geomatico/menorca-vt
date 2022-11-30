import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const SectionTitle = ({titleKey, sx}) => {
  return <Box mb={1} >
    <Typography
      variant='caption'
      sx={{...sx, pt: 3, fontWeight: 'bold', textTransform: 'uppercase'}}
    >
      {titleKey}
    </Typography>
  </Box>;
};

SectionTitle.propTypes = {
  titleKey: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

export default SectionTitle;