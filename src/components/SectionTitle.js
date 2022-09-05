import React from 'react';
import PropTypes from 'prop-types';
import {Divider, Typography} from '@mui/material';

function SectionTitle({title}) {
  return (
    <div style={{margin: '20px 0 15px 0'}}>
      <Typography variant='body1' style={{fontWeight:'bold', marginBottom: 5}}>{title}</Typography>
      <Divider/>
    </div>
  );
}

SectionTitle.propTypes = {
  title: PropTypes.string,
};

export default SectionTitle;