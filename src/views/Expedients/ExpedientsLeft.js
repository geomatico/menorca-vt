import React, {useState} from 'react';
import PropTypes from 'prop-types';

import FilterListIcon from '@mui/icons-material/FilterList';
import MenuIcon from '@mui/icons-material/Menu';

import Box from '@mui/material/Box';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import ReactCardFlip from 'react-card-flip';

import DrawerTitle from '../../components/DrawerTitle';
import LeftDrawer from '../../components/LeftDrawer';
import LogoBlanco from '../../components/LogoBlanco';
import ResponsiveHeader from '../../components/ResponsiveHeader';

const LEFT_DEFAULT_DRAWER_WIDTH = 420;

const ExpedientsLeft = ({mapComponent, indicatorsComponent, onLogout}) => {
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
          {indicatorsComponent}
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
        {indicatorsComponent}
      </LeftDrawer>
      <Box sx={mainContentStyle}>
        {mapComponent}
      </Box>
    </Hidden>
  </>;
};

ExpedientsLeft.propTypes = {
  mapComponent: PropTypes.node.isRequired,
  indicatorsComponent: PropTypes.node.isRequired,
  onLogout: PropTypes.func.isRequired
};

export default ExpedientsLeft;
