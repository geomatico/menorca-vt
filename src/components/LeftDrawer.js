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
const toolbar = {
  toolbar: theme => theme.mixins.toolbar,
};
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
const drawerTitle = {
  padding: theme => theme.spacing(2.5, 0, 0, 2),
  fontWeight: 'bold',
  marginTop: 7,
};
const drawerContent = {
  padding: theme => theme.spacing(0, 4, 2.5, 2),
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

  return (
    <Drawer
      variant='permanent'
      PaperProps={{style: {width: drawerWidth}}}
    >
      <Box sx={toolbar}/>
      <ResponsiveHeader logo={<LogoBlanco/>} width={drawerWidth}>
        <IconButton onClick={handleLogout} size="large">
          <ExitToApp/>
        </IconButton>
      </ResponsiveHeader>
      <Box onMouseDown={e => handleMouseDown(e)} sx={dragger}>
        <ArrowForwardIosIcon/>
      </Box>
      <Typography sx={drawerTitle} variant='h6'>Visor d&#039;expedients</Typography>
      <Box sx={drawerContent}>
        {children}
      </Box>
    </Drawer>
  );
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