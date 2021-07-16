import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';

import {Drawer, IconButton, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import LogoBlanco from '../../static/img/LogoBlanco';
import ResponsiveHeader from './ResponsiveHeader';
import {ExitToApp} from '@material-ui/icons';
import {setLoggedIn} from '../actions';
import {useDispatch} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  drawerTitle: {
    padding: theme.spacing(2.5, 0, 0, 2),
    fontWeight: 'bold',
    marginBottom: 5
  },
  drawerContent: {
    padding: theme.spacing(0, 4, 2.5, 2),
    display: 'flex',
    flexWrap: 'wrap',
  },
  dragger: {
    display: 'flex',
    alignItems: 'center',
    width: '30px',
    height: '100%',
    cursor: 'ew-resize',
    padding: '40px 0 0',
    position: 'absolute',
    right: 0,
    zIndex: 100,
    color: theme.palette.grey[500],
  }
}));

const LeftDrawer = ({defaultDrawerWidth, children, onDrawerWidthChange}) => {
  const dispatch = useDispatch();

  const minDrawerWidth = defaultDrawerWidth;
  const maxDrawerWidth = defaultDrawerWidth*4;
  const [drawerWidth, setDrawerWidth] = useState(defaultDrawerWidth);
  const classes = useStyles({defaultDrawerWidth, drawerWidth});

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
      <div className={classes.toolbar}/>
      <ResponsiveHeader logo={<LogoBlanco/>} width={drawerWidth}>
        <IconButton onClick={handleLogout}>
          <ExitToApp/>
        </IconButton>
      </ResponsiveHeader>
      <div onMouseDown={e => handleMouseDown(e)} className={classes.dragger}>
        <ArrowForwardIosIcon/>
      </div>
      <Typography className={classes.drawerTitle} variant='h6'>Visor d&#039;expedients</Typography>
      <div className={classes.drawerContent}>
        {children}
      </div>
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