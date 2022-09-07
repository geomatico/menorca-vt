import React from 'react';
import PropTypes from 'prop-types';
//MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
//STYLES
const toolBarStyle = {
  px: 2
};
const logoContainerStyle = {
  height: '40px',
  width: '200px',
  marginRight: 2
};
const titleStyle = {
  flexGrow: 1,
};

const ResponsiveHeader = ({startIcon, title, logo, anchor, children, width, onMenuClick}) => {
  const handleMenuClick = () => onMenuClick && onMenuClick();

  //STYLES
  const appBarStyle = {
    width: width,
    zIndex: theme => theme.zIndex.modal + 1,
    left: anchor === 'left' ? 0 : 'auto',
  };

  return <AppBar position="fixed" sx={appBarStyle}>
    <Toolbar sx={toolBarStyle}>
      {
        onMenuClick !== undefined && <IconButton onClick={handleMenuClick} color='inherit' size="large">
          {startIcon}
        </IconButton>
      }
      <Box sx={logoContainerStyle}>
        {logo}
      </Box>
      <Typography variant="h5" sx={titleStyle} noWrap>{title}</Typography>
      {children}
    </Toolbar>
  </AppBar>;
};

ResponsiveHeader.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  title: PropTypes.string,
  anchor: PropTypes.oneOf(['left', 'right']),
  startIcon: PropTypes.node,
  logo: PropTypes.element,
  onMenuClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

ResponsiveHeader.defaultProps = {
  width: '100%',
  anchor: 'left',
};

export default ResponsiveHeader;