import React from 'react';
import PropTypes from 'prop-types';

import {makeStyles} from '@material-ui/core/styles';

import {
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
}));

const ResponsiveHeader = ({title, children, drawerWidth}) => {
  const classes = useStyles({drawerWidth});

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
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