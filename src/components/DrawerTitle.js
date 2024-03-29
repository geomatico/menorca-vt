import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';

const drawerTitleStyle = {
  pt: { xs: 0, md: 2 },
  pl: 1,
  fontWeight: 'bold',
  mb: 0,
  textTransform: 'upperCase',
};

const DrawerTitle = ({children}) => <Typography sx={drawerTitleStyle} variant='body1'>{children}</Typography>;

DrawerTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default DrawerTitle;
