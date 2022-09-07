import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
//MUI
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
//MUI-ICONS
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExitToApp from '@mui/icons-material/ExitToApp';
//MENORCA-VT
import ResponsiveHeader from './ResponsiveHeader';
import LogoBlanco from '../../static/img/LogoBlanco';
//UTILS
import {setLoggedIn} from '../actions';
import {useDispatch} from 'react-redux';
//STYLES
const dragger = {
  display: 'flex',
  alignItems: 'center',
  width: '30px',
  height: '100%',
  cursor: 'ew-resize',
  padding: '40px 0 0',
  position: 'absolute',
  right: 0,
  zIndex: 100,
  color: 'grey.500',
};
const drawerTitleStyle = {
  pt: 2,
  pr: 0,
  pb: 0,
  pl: 2,
  fontWeight: 'bold',
  mt: 8,
  textTransform: 'upperCase',
};
const drawerContent = {
  pt: 0,
  pr: 4,
  pb: 2.5,
  pl: 2,
  display: 'flex',
  flexWrap: 'wrap',
};

const LeftDrawer = ({defaultDrawerWidth, children, onDrawerWidthChange}) => {
  const dispatch = useDispatch();

  const minDrawerWidth = defaultDrawerWidth;
  const maxDrawerWidth = defaultDrawerWidth*4;
  const [drawerWidth, setDrawerWidth] = useState(defaultDrawerWidth);

  const handleMouseDown = () => {
    document.addEventListener('mouseup', handleMouseUp, true);
    document.addEventListener('mousemove', handleMouseMove, true);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mouseup', handleMouseUp, true);
    document.removeEventListener('mousemove', handleMouseMove, true);
  };

  const handleMouseMove = useCallback(e => {
    const newWidth = e.clientX;
    if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
      setDrawerWidth(newWidth);
      onDrawerWidthChange(newWidth);
    }
  }, []);

  const handleLogout = () => dispatch(setLoggedIn(false));

  return <Drawer
    variant='permanent'
    PaperProps={{style: {width: drawerWidth}}}
  >
    <ResponsiveHeader logo={<LogoBlanco/>} width={drawerWidth}>
      <IconButton onClick={handleLogout} size="large">
        <ExitToApp/>
      </IconButton>
    </ResponsiveHeader>
    <Box onMouseDown={e => handleMouseDown(e)} sx={dragger}>
      <ArrowForwardIosIcon/>
    </Box>
    <Typography sx={drawerTitleStyle} variant='body1'>Visor d&#039;expedients</Typography>
    <Box sx={drawerContent}>
      {children}
    </Box>
  </Drawer>;
};

LeftDrawer.propTypes = {
  defaultDrawerWidth: PropTypes.number.isRequired,
  onDrawerWidthChange: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default LeftDrawer;