import React from 'react';
import PropTypes from 'prop-types';

import makeStyles from '@mui/styles/makeStyles';
import {IconButton} from '@mui/material';

import {
  AppBar,
  Toolbar,
  Typography
} from '@mui/material';

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: ({width}) => width,
    zIndex: theme.zIndex.modal + 1,
    left: ({anchor}) => anchor === 'left' ? 0 : 'auto',
  },
  toolBar: {
    padding: theme.spacing(0, 2, 0, 2),
  },
  menuButton: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
  logoContainer: {
    height: '40px',
    width: '200px',
    marginRight: theme.spacing(2)
  },
}));

const ResponsiveHeader = ({startIcon, title, logo, anchor, children, width, onMenuClick}) => {
  const classes = useStyles({width, anchor});
  const handleMenuClick = () => onMenuClick && onMenuClick();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        {
          onMenuClick !== undefined ?
            <IconButton onClick={handleMenuClick} color='inherit' size="large">
              {startIcon}
            </IconButton>
            : undefined
        }
        <div className={classes.logoContainer}>
          {logo}
        </div>
        <Typography variant="h5" className={classes.title} noWrap>{title}</Typography>
        {children}
      </Toolbar>
    </AppBar>
  );
};

ResponsiveHeader.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  title: PropTypes.string,
  anchor: PropTypes.oneOf(['left', 'right']),
  startIcon: PropTypes.node,
  logo: PropTypes.element,
  onMenuClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

ResponsiveHeader.defaultProps = {
  width: '100%',
  anchor: 'left',
};

export default ResponsiveHeader;