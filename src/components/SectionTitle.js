import React from 'react';
import PropTypes from 'prop-types';
//MUI
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const styles = {margin: '20px 0 15px 0'};
function SectionTitle({title, sx}) {
  return (
    <Box sx={{...styles, ...sx}}>
      <Typography className='title' variant='body1' style={{fontWeight:'bold', marginBottom: 5}}>{title}</Typography>
      <Divider/>
    </Box>
  );
}

SectionTitle.propTypes = {
  title: PropTypes.string,
  sx: PropTypes.object,
};

export default SectionTitle;