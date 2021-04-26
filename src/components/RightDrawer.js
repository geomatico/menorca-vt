import {Drawer, Hidden} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

const container = window !== undefined ? () => window.document.body : undefined;

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: ({width}) => width,
      flexShrink: 0,
    },
    position: 'relative',
    zIndex: theme.zIndex.drawer+1,
  },
  drawerPaper: {
    width: ({width}) => width,
  },
  drawerHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    margin: 0,
  },
  drawerContent: {
    padding: theme.spacing(0, 2)
  },
  closeIcon: {
    color: theme.palette.primary.contrastText
  }
}));

const RightDrawer = ({width, isOpen, onClose, children}) => {
  const classes = useStyles({width});

  const handleDrawerClose = () => onClose && onClose();

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="js">
        <Drawer
          container={container}
          variant="temporary"
          anchor="right"
          open={isOpen}
          onClose={handleDrawerClose}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={classes.toolbar}/>
          <div className={classes.drawerContent}>
            {children}
          </div>
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">

        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="persistent"
          anchor="right"
          open={isOpen}
        >
          <div className={classes.toolbar}/>
          <div className={classes.drawerContent}>
            {children}
          </div>
        </Drawer>
      </Hidden>
    </nav>
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
