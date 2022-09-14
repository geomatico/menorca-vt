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
import SwitchPad from '@geomatico/geocomponents/SwitchPad';
import DrawerTitle from '../../components/DrawerTitle';
import PropTypes from 'prop-types';

const RIGHT_DRAWER_WIDTH = 360;

const switchPadStyle = {
  '& .SwitchPad-text': {
    fontSize: '0.75rem'
  }
};

const baseMapListStyle = {
  '& .LayerSwitcher-text': {
    fontSize: '0.75rem'
  }
};

const ExpedientsRight = ({mapStyle, maxDate, dateRange, isExpedientsConsellVisible, isExpedientsCiutadellaVisible, selectedConsellCategories, selectedCiutadellaCategories, setMapStyle, setExpedientsConsellVisible, setExpedientsCiutadellaVisible, setSelectedConsellCategories, setSelectedCiutadellaCategories, setDateRange}) => {

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
      <ExpandContent title={'Expedients consell insular'} isChecked={isExpedientsConsellVisible} onChange={setExpedientsConsellVisible}>
        <SwitchPad
          categories={config.consellCategories}
          selected={selectedConsellCategories}
          onSelectionChange={setSelectedConsellCategories}
          sx={switchPadStyle}
        />
      </ExpandContent>
      <ExpandContent title={'Expedients Aj. Ciutadella'} isChecked={isExpedientsCiutadellaVisible} onChange={setExpedientsCiutadellaVisible}>
        <SwitchPad
          categories={config.ciutadellaCategories}
          selected={selectedCiutadellaCategories}
          onSelectionChange={setSelectedCiutadellaCategories}
          sx={switchPadStyle}
        />
      </ExpandContent>
      <ExpandContent title={'Rang de dates'}>
        <div style={{padding: '0 16px', width: '100%'}}>
          <RangeSlider min={config.minDate} max={maxDate} value={dateRange} onValueChange={setDateRange} animationInterval={1000}/>
        </div>
      </ExpandContent>
      <ExpandContent title={'Mapes base'}>
        <BaseMapList
          styles={config.mapStyles}
          selectedStyleId={mapStyle}
          onStyleChange={setMapStyle}
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
  maxDate: PropTypes.number.isRequired,
  dateRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  isExpedientsConsellVisible: PropTypes.bool.isRequired,
  isExpedientsCiutadellaVisible: PropTypes.bool.isRequired,
  selectedConsellCategories: PropTypes.array.isRequired,
  selectedCiutadellaCategories: PropTypes.array.isRequired,
  setMapStyle: PropTypes.func.isRequired,
  setExpedientsConsellVisible: PropTypes.func.isRequired,
  setExpedientsCiutadellaVisible: PropTypes.func.isRequired,
  setSelectedConsellCategories: PropTypes.func.isRequired,
  setSelectedCiutadellaCategories: PropTypes.func.isRequired,
  setDateRange: PropTypes.func.isRequired
};

export default ExpedientsRight;
