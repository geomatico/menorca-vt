import React from 'react';
import PropTypes from 'prop-types';

import {makeStyles} from '@material-ui/core/styles';
import {IconButton} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';

import {
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1
  },
  toolBar: {
    padding: theme.spacing (0, 2, 0, 2),
  },
  menuButton: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
}));

const ResponsiveHeader = ({title, children, drawerWidth, onMenuClick}) => {
  const classes = useStyles({drawerWidth});

  const handleMenuClick = () => onMenuClick && onMenuClick();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <IconButton edge="start" color="inherit" className={classes.menuButton} aria-label="menu" onClick={handleMenuClick}>
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap>
            {title}
          </Typography>
          {children}
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </div>
  );
};

ResponsiveHeader.propTypes = {
  title: PropTypes.string.isRequired,
  startIcon: PropTypes.node,
  onMenuClick: PropTypes.func,
  drawerWidth: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default ResponsiveHeader;