import React, {useState} from 'react';
import PropTypes from 'prop-types';

import FilterListIcon from '@mui/icons-material/FilterList';
import Hidden from '@mui/material/Hidden';
import Box from '@mui/material/Box';

import BaseMapList from '@geomatico/geocomponents/BaseMapList';
import RangeSlider from '@geomatico/geocomponents/RangeSlider';
import ColorRampLegend from '@geomatico/geocomponents/ColorRampLegend';

import config from '../../config.json';

import DatasetExpand from '../../components/DatasetExpand';
import DrawerTitle from '../../components/DrawerTitle';
import ExpandContent from '../../components/ExpandContent';
import RightDrawer from '../../components/RightDrawer';
import SquareButtonIcon from '../../components/SquareButtonIcon';
import {Button, Slider} from '@mui/material';

const RIGHT_DRAWER_WIDTH = 360;

const baseMapListStyle = {
  mt: 1,
  '& .LayerSwitcher-text': {
    fontSize: '0.75rem'
  }
};

const legendSx = {
  position: 'absolute',
  bottom: '28px',
  right: '10px',
  width: 256
};

const maxDate = new Date().getFullYear();

const ExpedientsRight = ({
                           mapStyle,
                           onMapStyleChanged,
                           dateRange,
                           onDateRangeChanged,
                           visibleCategories,
                           onVisibleCategoriesChanged,
                           onAggregateDataChange,
                           isAggregateData,
                           radius,
                           onRadiusChange
                         }) => {
  const [isRightDrawerOpen, setRightDrawerOpen] = useState(false);
  const handleDrawerToggle = () => setRightDrawerOpen(!isRightDrawerOpen);

  const buttonContentStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    height: 'auto',
    width: isRightDrawerOpen ? `calc(100% - ${RIGHT_DRAWER_WIDTH}px)` : '100%',
    transition: theme => theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  };

  const datasetIds = Object.keys(config.datasets);

  const handleCategoriesVisibility = datasetId => datasetVisibleCategories => onVisibleCategoriesChanged({
    ...visibleCategories,
    [datasetId]: datasetVisibleCategories
  });


  return <>
    <Hidden smDown implementation="css">
      <Box sx={buttonContentStyle}>
        <SquareButtonIcon onClick={handleDrawerToggle}>
          <FilterListIcon/>
        </SquareButtonIcon>
      </Box>
    </Hidden>
    <RightDrawer width={RIGHT_DRAWER_WIDTH} isOpen={isRightDrawerOpen} onClose={() => setRightDrawerOpen(false)}>
      <DrawerTitle>Control de capes</DrawerTitle>
      {datasetIds.map(datasetId => <DatasetExpand
        key={datasetId}
        id={datasetId}
        onVisibilityChanged={handleCategoriesVisibility(datasetId)}
      />)}
      <ExpandContent title={'Rang de dates'}>
        <div style={{
          padding: '0',
          width: '100%'
        }}>
          <RangeSlider min={config.minDate} max={maxDate} value={dateRange} onValueChange={onDateRangeChanged}
                       animationInterval={300}/>
        </div>
      </ExpandContent>
      <ExpandContent title={'Mapes base'}>
        <BaseMapList
          styles={config.mapStyles}
          selectedStyleId={mapStyle}
          onStyleChange={onMapStyleChanged}
          thumbnailWidth={60}
          thumbnailHeight={40}
          variant='list'
          sx={baseMapListStyle}
        />
      </ExpandContent>
      <Box display='flex' justifyContent='center' width={'100%'}>
        <Button onClick={() => onAggregateDataChange(!isAggregateData)} variant="contained"
                sx={{mt: '40px'}}>{isAggregateData ? 'Ver datos discretos' : 'Ver datos agregados'}</Button>
      </Box>
      {
        isAggregateData &&
        <Box mt={3}>
          Radius:
          <Slider defaultValue={radius} onChange={(e, value) => onRadiusChange(value)} aria-label="Default"
                  valueLabelDisplay="auto"/>

          <Box>
            <ColorRampLegend sx={legendSx} colorScheme={'BrewerRdYlGn5'} domain={[0, 100]}></ColorRampLegend>
          </Box>

        </Box>
      }
    </RightDrawer>
  </>;
};

ExpedientsRight.propTypes = {
  mapStyle: PropTypes.string.isRequired,
  onMapStyleChanged: PropTypes.func.isRequired,
  dateRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  onDateRangeChanged: PropTypes.func.isRequired,
  visibleCategories: PropTypes.object.isRequired,
  onVisibleCategoriesChanged: PropTypes.func.isRequired,
  onAggregateDataChange: PropTypes.func.isRequired,
  isAggregateData: PropTypes.bool.isRequired,
  radius: PropTypes.number.isRequired,
  onRadiusChange: PropTypes.func.isRequired,
};

export default ExpedientsRight;
