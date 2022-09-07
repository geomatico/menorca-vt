import React from 'react';
import PropTypes from 'prop-types';
//MUI
import IconButton from '@mui/material/IconButton';
//STYLES
const buttonStyle = {
  position: 'relative',
  mr: 1.25,
  top: 20,
  left: 0,
  zIndex: 1000,
  width: 40,
  height: 40,
  borderRadius: 0,
  bgcolor: 'primary.main',
  color: 'primary.contrastText',
  '&:hover': {
    bgcolor: 'secondary.main'
  }
};
const SquareButtonIcon = ({children, onClick}) => {

  const handleClick = () => onClick && onClick ();

  return <IconButton sx={buttonStyle} onClick={handleClick} size="large">
    {children}
  </IconButton>;
};

SquareButtonIcon.propTypes = {
  children: PropTypes.element,
  onClick: PropTypes.func.isRequired,
};

export default SquareButtonIcon;