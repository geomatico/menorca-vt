import React from 'react';
import PropTypes from 'prop-types';
import {IconButton} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  button: {
    position: 'relative',
    marginRight: 10,
    top: 20,
    left: 0,
    zIndex: 1000,
    width: 40,
    height: 40,
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover':{
      backgroundColor: theme.palette.secondary.main
    }
  },

}));

function SquareButtonIcon({children, onClick}) {
  const classes = useStyles();
  const handleClick = () => onClick && onClick ();
  return <>
    <IconButton className={classes.button} onClick={handleClick} size="large">
      {children}
    </IconButton>
  </>;
}

SquareButtonIcon.propTypes = {
  children: PropTypes.element,
  onClick: PropTypes.func.isRequired,
};

export default SquareButtonIcon;