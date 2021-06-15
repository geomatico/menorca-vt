import React from 'react';
import PropTypes from 'prop-types';

import {Accordion, AccordionDetails, AccordionSummary, Divider, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    }
    ,
  }
  ,
  expanded: {}
})(AccordionSummary);

const AccordionValues = withStyles({
  root: {
    padding: 0,
    marginBottom: 10,
  },
})(AccordionDetails);

function ExpandContent({title, children}) {
  return (
    <AccordionLayer elevation={0}>
      <AccordionContent expandIcon={<ExpandMoreIcon/>}>
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
  ])
};

export default ExpandContent;