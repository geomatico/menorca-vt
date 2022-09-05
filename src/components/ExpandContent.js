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
const accordion = {
  p: 0,
  m: '8px 0',
  '&.Mui-expanded': {
    m: '8px 0',
  },
  '&::before': {
    bgcolor: 'transparent',
  },
  '& .MuiButtonBase-root': {
    minHeight: '28px',
  }
};
const summary = {
  p: 0,
  m: 0,
  borderBottom: '1px solid lightgray',
  '& .MuiAccordionSummary-content': {
    m: 0,
  },
  '&.Mui-expanded': {
    '& .MuiAccordionSummary-content': {
      m: 0,
    },
    minHeight: '28px',
  },
};
const details = {
  p: 0,
  mb: 2,
  '& .MuiListItem-root': {
    m: 0,
    p: 0
  }
};

const ExpandContent = ({title, children, onChange, isChecked}) => {
  const toggle = () => onChange(!isChecked);

  return <Accordion elevation={0} sx={accordion}>
    <AccordionSummary
      aria-label='Expand'
      expandIcon={<ExpandMoreIcon/>}
      sx={summary}
    >
      {
        onChange && <FormControlLabel
          sx={{ml: 0}}
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
      }
      <Typography variant='body1' style={{marginLeft: 5, fontWeight: 'bold'}}>{title}</Typography>
      <Divider/>
    </AccordionSummary>
    <AccordionDetails sx={details}>{children}</AccordionDetails>
  </Accordion>;
};

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
