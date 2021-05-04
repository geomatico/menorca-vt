import React from 'react';
import PropTypes from 'prop-types';

import {List, ListItem, ListItemText, Checkbox, ListItemAvatar, Avatar, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  downloadIcon: {
    color: theme.palette.primary.main,
  },
  small: {
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  large: {
    backgroundColor: theme.palette.primary.main,
  },
  listItemLayer: {
    paddingLeft: 8,
  },
  thumbnail: {
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: 2,
    width: ({width}) => width,
    height: ({height}) => height,
    textTransform: 'initial',
    margin: 0,
    padding: 0,
  },
}));

function BaseMapList({width, height, styles, selectedStyleUrl, onStyleChange}) {
  const {thumbnail} = styles.find(({url}) => url === selectedStyleUrl);
  const classes = useStyles({width, height, thumbnail});
  const handleClick = (url) => () => onStyleChange(url);

  return (
    <List dense>
      {
        styles.map(({label, thumbnail, url}, index) => (
          <ListItem key={index} divider={!open}className={classes.listItemLayer}>
            <ListItemAvatar >
              <Avatar alt={label} src={thumbnail} className={classes.thumbnail} />
            </ListItemAvatar>
            <Checkbox color='primary' checked={url === selectedStyleUrl} onChange={handleClick(url)}/>
            <ListItemText disableTypography>
              <Typography variant='caption'>{label}</Typography>
            </ListItemText>
          </ListItem>
        ))
      }
    </List>
  );
}

BaseMapList.propTypes = {
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

BaseMapList.defaultProps = {
  width: 60,
  height: 40,
};

export default BaseMapList;