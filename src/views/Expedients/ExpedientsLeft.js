import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Hidden from '@mui/material/Hidden';
import ResponsiveHeader from '../../components/ResponsiveHeader';
import MenuIcon from '@mui/icons-material/Menu';
import LogoBlanco from '../../components/LogoBlanco';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import ReactCardFlip from 'react-card-flip';
import Box from '@mui/material/Box';
import DrawerTitle from '../../components/DrawerTitle';
import LeftDrawer from '../../components/LeftDrawer';


const LEFT_DEFAULT_DRAWER_WIDTH = 420;

const ExpedientsLeft = ({mapComponent, chartsComponent, onLogout}) => {
  const [leftDrawerWidth, setLeftDrawerWidth] = useState(LEFT_DEFAULT_DRAWER_WIDTH);
  const [isFlipped, setFlipped] = useState(false);

  const mainContentStyle = {
    width: `calc(100% - ${leftDrawerWidth}px)`,
    height: '100vh',
    flexGrow: 1,
    padding: 0,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: leftDrawerWidth,
  };

  const handleCardFlip = () => setFlipped(!isFlipped);
  const handleDrawerWidthChange = (width) => setLeftDrawerWidth(width);

  return <>
    {/*FLIPCARD MOBILE*/}
    <Hidden smUp implementation="js">
      <ResponsiveHeader
        startIcon={<MenuIcon/>}
        onMenuClick={handleCardFlip}
        logo={<LogoBlanco/>}
      >
        <IconButton /*onClick={handleDrawerToggle}*/ size="large">
          <FilterListIcon style={{color: 'white'}}/>
        </IconButton>
      </ResponsiveHeader>
      <ReactCardFlip isFlipped={isFlipped}>
        <main style={{width: '100vw', height: '100vh'}}>
          {mapComponent}
        </main>
        <Box sx={{px: 2, pt: 9.5}}>
          <DrawerTitle>Visor d&#039;expedients</DrawerTitle>
          {chartsComponent}
        </Box>
      </ReactCardFlip>
    </Hidden>

    {/*LEFTDRAWER DESKTOP*/}
    <Hidden smDown implementation="css">
      <LeftDrawer
        defaultDrawerWidth={LEFT_DEFAULT_DRAWER_WIDTH}
        onDrawerWidthChange={handleDrawerWidthChange}
        onLogout={onLogout}
      >
        {chartsComponent}
      </LeftDrawer>
      <Box sx={mainContentStyle}>
        {mapComponent}
      </Box>
    </Hidden>
  </>;
};

ExpedientsLeft.propTypes = {
  mapComponent: PropTypes.node.isRequired,
  chartsComponent: PropTypes.node.isRequired,
  onLogout: PropTypes.func.isRequired
};

export default ExpedientsLeft;
