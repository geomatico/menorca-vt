import React from 'react';
import PropTypes from 'prop-types';
//MUI
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
//MUI-ICONS
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//GEOCOMPONENTS
import ColorSwitch from '@geomatico/geocomponents/ColorSwitch';
//STYLES
import withStyles from '@mui/styles/withStyles';
import makeStyles from '@mui/styles/makeStyles';

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

function ExpandContent({title, children, onChange, isChecked}) {
  const classes = useStyles ();
  const toggle = () => onChange(!isChecked);

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
                  onChange={toggle}
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
  isChecked: PropTypes.bool,
  onChange: PropTypes.func
};

ExpandContent.defaultProps = {
  isChecked: true
};

export default ExpandContent;
