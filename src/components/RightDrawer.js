import {Drawer, Hidden} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

const container = window !== undefined ? () => window.document.body : undefined;

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  drawerContent: {
    padding: theme.spacing(0, 1),
    width: '95%'
  },
  drawerPaper: {
    top: 20,
    bottom: 20,
    height: '95vh',
    width: ({width}) => width,
  },
}));

const RightDrawer = ({width, isOpen, onClose, children}) => {
  const classes = useStyles({width});

  const handleDrawerClose = () => onClose && onClose();

  return (
    <>
      <Hidden smUp implementation="js">{/*MOBILE*/}
        <Drawer
          classes={{paper: classes.drawerPaper}}
          ModalProps={{keepMounted: true}}// Better open performance on mobile.
          container={container}
          variant="temporary"
          anchor="right"
          open={isOpen}
          onClose={handleDrawerClose}
        >
          <div className={classes.toolbar}/>
          <div className={classes.drawerContent}>
            {children}
          </div>
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">{/*DESKTOP*/}
        <Drawer
          classes={{paper: classes.drawerPaper}}
          variant="persistent"
          anchor="right"
          open={isOpen}
        >
          <div className={classes.drawerContent}>
            {children}
          </div>
        </Drawer>
      </Hidden>
    </>
  );
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
