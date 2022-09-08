import React from 'react';
import PropTypes from 'prop-types';
//MUI
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
//STYLES
const drawerContentStyle = {
  py: 0,
  px: 1,
  width: '95%',
};

const container = window !== undefined ? () => window.document.body : undefined;

const RightDrawer = ({width, isOpen, onClose, children}) => {
  const handleDrawerClose = () => onClose && onClose();

  //STYLES
  const drawerStyle = {
    '& .MuiPaper-root': {
      top: 20,
      bottom: 20,
      width: width,
    }
  };
  
  return <>
    <Hidden smUp implementation="js">{/*MOBILE*/}
      <Drawer
        sx={drawerStyle}
        ModalProps={{keepMounted: true}}// Better open performance on mobile.
        variant="temporary"
        container={container}
        anchor="right"
        open={isOpen}
        onClose={handleDrawerClose}
      >
        <Box sx={theme => theme.mixins.toolbar}/>
        <Box sx={drawerContentStyle}>
          {children}
        </Box>
      </Drawer>
    </Hidden>
    <Hidden smDown implementation="css">{/*DESKTOP*/}
      <Drawer
        sx={drawerStyle}
        variant="persistent"
        anchor="right"
        open={isOpen}
      >
        <Box sx={drawerContentStyle}>
          {children}
        </Box>
      </Drawer>
    </Hidden>
  </>;
};

RightDrawer.propTypes = {
  width: PropTypes.number,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default RightDrawer;