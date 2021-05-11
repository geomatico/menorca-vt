import React from 'react';
import PropTypes from 'prop-types';
import SectionTitle from './SectionTitle';
import {makeStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';

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