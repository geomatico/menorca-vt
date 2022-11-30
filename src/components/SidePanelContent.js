import React from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import styled from '@mui/styles/styled';

import GeomaticoLink from './GeomaticoLink';
import ManagementIndicators from './sidepanels/ManagementIndicators';
import PlanningIndicators from './sidepanels/PlanningIndicators';
import QualityIndicators from './sidepanels/QualityIndicators';

const ScrollableContent = styled(Box)({
  overflow: 'auto',
  padding: '8px',
});

const stackSx = {
  height: '100%',
  overflow: 'hidden'
};

const SidePanelContent = ({manager, visibleCategories, dateRange, BBOX}) =>
  <Stack sx={stackSx}>
    <ScrollableContent>
      {manager === 'quality' &&
        <>
          <QualityIndicators
            visibleCategories={visibleCategories}
            dateRange={dateRange}
            BBOX={BBOX}
          />
        </>
      }
      {manager === 'management' &&
        <>
          <ManagementIndicators
            visibleCategories={visibleCategories}
            dateRange={dateRange}
            BBOX={BBOX}
          />
        </>
      }
      {manager === 'planning' &&
        <>
          <PlanningIndicators/>
        </>
      }
    </ScrollableContent>
    <GeomaticoLink/>
  </Stack>;

SidePanelContent.propTypes = {
  manager: PropTypes.oneOf(['quality', 'management', 'planning']).isRequired,
  visibleCategories: PropTypes.object.isRequired,
  dateRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  BBOX: PropTypes.arrayOf(PropTypes.number)
};

export default SidePanelContent;