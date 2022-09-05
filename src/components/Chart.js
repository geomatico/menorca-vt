import React from 'react';
import PropTypes from 'prop-types';
//MUI
import Box from '@mui/material/Box';
//MENORCA-VT
import SectionTitle from './SectionTitle';
//STYLES
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  chartContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow:1,
    margin: '0 10px 10px 10px',
  },
});

function Chart({title, children}) {
  const classes = useStyles();
  return (
    <div className={classes.chartContainer}>
      <SectionTitle title={title}/>
      <Box display='flex' flexDirection='column' alignItems='flex-start'>
        {children}
      </Box>
    </div>
  );
}

Chart.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
};

export default Chart;