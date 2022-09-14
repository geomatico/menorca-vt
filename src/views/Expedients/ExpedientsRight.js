import Hidden from '@mui/material/Hidden';
import Box from '@mui/material/Box';
import SquareButtonIcon from '../../components/SquareButtonIcon';
import FilterListIcon from '@mui/icons-material/FilterList';
import RightDrawer from '../../components/RightDrawer';
import ExpandContent from '../../components/ExpandContent';
import config from '../../config.json';
import React, {useState} from 'react';

import BaseMapList from '@geomatico/geocomponents/BaseMapList';
import RangeSlider from '@geomatico/geocomponents/RangeSlider';
import DrawerTitle from '../../components/DrawerTitle';
import PropTypes from 'prop-types';
import DatasourceExpand from './DatasourceExpand';

const RIGHT_DRAWER_WIDTH = 360;

const baseMapListStyle = {
  '& .LayerSwitcher-text': {
    fontSize: '0.75rem'
  }
};

const maxDate = new Date().getFullYear();

const ExpedientsRight = ({mapStyle, onMapStyleChanged, dateRange, onDateRangeChanged, visibleCategories, onVisibleCategoriesChanged}) => {
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

  const datasources = Object.keys(config.datasources);

  const handleCategoriesVisibility = datasource => datasourceVisibleCategories => onVisibleCategoriesChanged({
    ...visibleCategories,
    [datasource]: datasourceVisibleCategories
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
      {datasources.map(datasource => <DatasourceExpand
        key={datasource}
        id={datasource}
        onVisibilityChanged={handleCategoriesVisibility(datasource)}
      />)}
      <ExpandContent title={'Rang de dates'}>
        <div style={{padding: '0 16px', width: '100%'}}>
          <RangeSlider min={config.minDate} max={maxDate} value={dateRange} onValueChange={onDateRangeChanged} animationInterval={1000}/>
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
    </RightDrawer>
  </>;
};

ExpedientsRight.propTypes = {
  mapStyle: PropTypes.string.isRequired,
  onMapStyleChanged: PropTypes.func.isRequired,
  dateRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  onDateRangeChanged: PropTypes.func.isRequired,
  visibleCategories: PropTypes.object.isRequired,
  onVisibleCategoriesChanged: PropTypes.func.isRequired
};

export default ExpedientsRight;
