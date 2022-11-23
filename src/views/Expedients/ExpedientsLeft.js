import React, {useState} from 'react';
import PropTypes from 'prop-types';

import FilterListIcon from '@mui/icons-material/FilterList';
import MenuIcon from '@mui/icons-material/Menu';

import Box from '@mui/material/Box';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import ReactCardFlip from 'react-card-flip';

//GEOCOMPONENTS
import MiniSidePanel from '@geomatico/geocomponents/MiniSidePanel';
import SidePanel from '@geomatico/geocomponents/SidePanel';
import ResponsiveHeader from '@geomatico/geocomponents/ResponsiveHeader';

import DrawerTitle from '../../components/DrawerTitle';
import LogoBlanco from '../../components/LogoBlanco';

import ExitToApp from '@mui/icons-material/ExitToApp';
import DatasetIcon from '@mui/icons-material/Dataset';
import WorkIcon from '@mui/icons-material/Work';
/*import ApartmentIcon from '@mui/icons-material/Apartment';*/

const LEFT_DRAWER_WIDTH = '40vw';
const MINI_SIDE_PANEL_WIDTH = '48px';

const MINISIDEPANEL_CONFIG = [
  {
    id: 'quality',
    label: 'Qualitat',
    content: <DatasetIcon/>
  },
  {
    id: 'management',
    label: 'Gestió',
    content: <WorkIcon/>
  },
  /*{
    id: 'planning',
    label: 'Urbanisme',
    content: <ApartmentIcon/>
  },*/
];

const ExpedientsLeft = ({mapComponent, selectedActionId, sidePanelContent, onActionClick, onLogout}) => {
  const [isFlipped, setFlipped] = useState(false);

  const mainContentStyle = {
    width: `calc(100% - ${LEFT_DRAWER_WIDTH}px)`,
    height: '100vh',
    flexGrow: 1,
    padding: 0,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: LEFT_DRAWER_WIDTH,
  };

  const handleCardFlip = () => setFlipped(!isFlipped);

  const handleLogout = () => onLogout(false);


  return <>
    {/*FLIPCARD MOBILE*/}
    <Hidden smUp implementation="js">
      <ResponsiveHeader
        title=''
        startIcon={<MenuIcon/>}
        logo={<LogoBlanco/>}
        onStartIconClick={handleCardFlip}
        sx={{'&.MuiAppBar-root': {zIndex: 1500}}}
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
          {sidePanelContent}
        </Box>
      </ReactCardFlip>
      {/*<BottomMenu actions={MINISIDEPANEL_CONFIG}/>*/}
    </Hidden>

    {/*LEFTDRAWER DESKTOP*/}
    <Hidden smDown implementation="css">
      <>
        <ResponsiveHeader
          title=''
          logo={<LogoBlanco/>}
          onStartIconClick={null}
          sx={{'&.MuiAppBar-root': {zIndex: 1500, width: LEFT_DRAWER_WIDTH}}}
        >
          <IconButton onClick={handleLogout} size="large">
            <ExitToApp/>
          </IconButton>
        </ResponsiveHeader>
        <MiniSidePanel
          sx={{
            '& .MuiPaper-root': {width: MINI_SIDE_PANEL_WIDTH},
            '& .MuiButtonBase-root': {pr: 1, pl: 0.75},
            '& .MiniSidePanel-item': {
              '&:hover': {
                bgcolor: 'primary.dark'
              }
              /*'&:hover': {
                bgcolor: theme => darken(theme.palette.primary.main, 0.25)
              }*/
            },
          }}
          actions={MINISIDEPANEL_CONFIG}
          selectedActionId={selectedActionId}
          onActionClick={onActionClick}
        />
        {
          <SidePanel
            drawerWidth={`calc(${LEFT_DRAWER_WIDTH} - ${MINI_SIDE_PANEL_WIDTH})`}
            anchor="left"
            isOpen={true}
            onClose={() => {}}
            widescreen={true}
            sx={{
              '& .MuiPaper-root': {
                left: MINI_SIDE_PANEL_WIDTH,
                height: 'calc(100% - 64px)',
                top: '64px',
                p: 1,
              }
            }}
          >
            {sidePanelContent}
          </SidePanel>
        }
        <Box sx={mainContentStyle}>
          {mapComponent}
        </Box>
      </>
    </Hidden>
  </>;
};

ExpedientsLeft.propTypes = {
  mapComponent: PropTypes.node.isRequired,
  selectedActionId: PropTypes.string,
  sidePanelContent: PropTypes.element.isRequired,
  onActionClick: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired
};

ExpedientsLeft.defaultProps = {
  selectedActionId: 'quality',
};

export default ExpedientsLeft;
