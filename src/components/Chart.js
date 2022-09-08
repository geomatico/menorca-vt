import React from 'react';
import PropTypes from 'prop-types';
//MUI
import Box from '@mui/material/Box';
//MENORCA-VT
import SectionTitle from './SectionTitle';
//STYLES
const chartContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  flexGrow:1,
  margin: '0 10px 10px 10px'
};

const Chart = ({title, children}) => {
  return <Box sx={chartContainerStyle}>
    <SectionTitle title={title}/>
    <Box display='flex' flexDirection='column' alignItems='flex-start'>
      {children}
    </Box>
  </Box>;
};

Chart.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Chart;