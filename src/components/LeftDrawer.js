import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';

import {Drawer} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  drawerContent: {
    padding: theme.spacing(0, 2),
  },
  dragger: {
    width: '5px',
    cursor: 'ew-resize',
    padding: '4px 0 0',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: theme.palette.grey[500]
  }
}));


const LeftDrawer = ({defaultDrawerWidth, children, onDrawerWidthChange}) => {
  const classes = useStyles({defaultDrawerWidth});
  const minDrawerWidth = defaultDrawerWidth*0.75;
  const maxDrawerWidth = defaultDrawerWidth*1.50;
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

  return (
    <Drawer
      variant='permanent'
      PaperProps={{style: {width: drawerWidth}}}
    >
      <div className={classes.toolbar}/>
      <div onMouseDown={e => handleMouseDown(e)} className={classes.dragger}/>
      <div className={classes.drawerContent}>
        {children}
      </div>
    </Drawer>
  );
};

LeftDrawer.propTypes = {
  onDrawerWidthChange: PropTypes.func.isRequired,
  defaultDrawerWidth: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default LeftDrawer;