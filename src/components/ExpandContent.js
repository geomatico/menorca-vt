import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {Accordion, AccordionDetails, AccordionSummary, Divider, Typography, FormControlLabel} from '@material-ui/core';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {ColorSwitch} from 'geocomponents';

const AccordionLayer = withStyles({
  root: {
    padding: 0,
    margin: 0,
    borderBottom: '1px solid lightgray',
    '&:before': {
      opacity: 0,
    },
  },
  expanded: {
    padding: 0,
    margin: 0,
  },
})(Accordion);

const AccordionContent = withStyles({
  root: {
    padding: 0,
    borderBottom: 'none',
    '&$expanded': {
      minHeight: 48,
    },
  },
  content: {
    '&$expanded': {
      margin: 0,
    },
  },
  expanded: {}
})(AccordionSummary);

const AccordionValues = withStyles({
  root: {
    padding: 0,
    marginBottom: 10,
  },
})(AccordionDetails);

const useStyles = makeStyles({
  control: {
    marginLeft: 0
  },
});

function ExpandContent({title, children, onChange}) {
  const classes = useStyles ();
  const [isChecked, setChecked] = useState(true);
  const handleChange = () => {
    setChecked(!isChecked);
    onChange(!isChecked);
  };

  return (
    <AccordionLayer elevation={0}>
      <AccordionContent
        aria-label='Expand'
        expandIcon={<ExpandMoreIcon/>}
      >
        {
          onChange ?
            <FormControlLabel
              className={classes.control}
              aria-label='On/Off layers'
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={
                <ColorSwitch
                  checked={isChecked}
                  onChange={handleChange}
                  name='checkedLayer'
                  color='#000'
                />
              }
            />
            : undefined
        }
        <Typography variant='body1' style={{marginLeft: 5, fontWeight: 'bold'}}>{title}</Typography>
        <Divider/>
      </AccordionContent>
      <AccordionValues>{children}</AccordionValues>
    </AccordionLayer>
  );
}

ExpandContent.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};


export default ExpandContent;