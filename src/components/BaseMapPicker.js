import React from 'react';
import PropTypes from 'prop-types';

import {makeStyles, Typography} from '@material-ui/core';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

const generalStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: ({position}) => position.startsWith('top') ? theme.spacing(2) : 'auto',
    bottom: ({position}) => position.startsWith('bottom') ? theme.spacing(2) : 'auto',
    left: ({position}) => position.endsWith('left') ? theme.spacing(2) : 'auto',
    right: ({position}) => position.endsWith('right') ? theme.spacing(2) : 'auto',
  },
  label: {
    bottom: 0,
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
  }
}));

const buttonStyles = makeStyles((theme) => ({
  fab: {
    border: `2px solid ${theme.palette.background.paper}`,
    borderRadius: 4,
    backgroundImage: ({thumbnail}) => `url(${thumbnail})`,
    width: ({width}) => width,
    height: ({height}) => height,
    textTransform: 'initial',
  }
}));

const BaseMapPicker = ({position, direction, width, height, styles, selectedStyleUrl, onStyleChange}) => {
  const [open, setOpen] = React.useState(false);

  const {label, thumbnail} = styles.find(({url}) => url === selectedStyleUrl);

  const {root, label: labelClasses} = generalStyles({position});
  const {fab} = buttonStyles({thumbnail, width, height});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (url) => () => {
    onStyleChange(url);
    handleClose();
  };

  return <SpeedDial
    ariaLabel="Base Map Picker"
    classes={{root, fab}}
    onClose={handleClose}
    onOpen={handleOpen}
    open={open}
    direction={direction}
    icon={<Typography style={{fontWeight: 600}} noWrap={true} variant='caption'>{label}</Typography>}
    FabProps={{
      variant: 'extended',
      color: 'default',
      classes:  {label: labelClasses}
    }}
  >
    {styles.filter(({url}) => url !== selectedStyleUrl).map(({label, thumbnail, url}) => {
      const {fab: actionFab} = buttonStyles({thumbnail, width, height});
      return <SpeedDialAction
        title={label}
        classes={{fab: actionFab}}
        key={label}
        icon={<Typography style={{fontWeight: 600}} noWrap={true} variant='caption'>{label}</Typography>}
        tooltipTitle={label}
        onClick={handleClick(url)}
        FabProps={{
          variant: 'extended',
          size: 'large',
          color: 'default',
          classes: {label: labelClasses}
        }}
      />;
    })}
  </SpeedDial>;
};

BaseMapPicker.propTypes = {
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  position: PropTypes.oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right']),
  width: PropTypes.number,
  height: PropTypes.number,
  styles: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedStyleUrl: PropTypes.string.isRequired,
  onStyleChange: PropTypes.func.isRequired
};

BaseMapPicker.defaultProps = {
  direction: 'up',
  position: 'bottom-right',
  width: 96,
  height: 64
};

export default BaseMapPicker;
