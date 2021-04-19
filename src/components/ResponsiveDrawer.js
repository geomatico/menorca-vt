import {Divider, Drawer, Hidden, IconButton, Toolbar, Typography} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const container = window !== undefined ? () => window.document.body : undefined;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: ({width}) => width,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: ({width}) => width,
  },
  drawerHeader: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.contrastText,
    margin: 0,
  },
  drawerContent: {
    padding: theme.spacing(2)
  },
  closeIcon: {
    color: theme.palette.primary.contrastText
  }
}));

const ResponsiveDrawer = ({width, isOpen, onClose, children}) => {
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
          <Toolbar className={classes.drawerHeader}>
            <Typography variant='h6'>Lista de capas y filtros</Typography>
          </Toolbar>
          <Divider/>
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
          <Toolbar className={classes.drawerHeader}>
            <Typography variant='h6'>Lista de capas y filtros</Typography>
            <IconButton>
              <ChevronRightIcon onClick={handleDrawerClose} className={classes.closeIcon}/>
            </IconButton>
          </Toolbar>
          <Divider/>
          <div className={classes.drawerContent}>
            {children}
          </div>
        </Drawer>
      </Hidden>
    </nav>
  );
};

ResponsiveDrawer.propTypes = {
  width: PropTypes.number,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default ResponsiveDrawer;
