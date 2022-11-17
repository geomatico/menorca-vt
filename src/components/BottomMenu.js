import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

//MUI
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';

//STYLES
const navigationStyle = {
  width: '100%',
};

const actionStyle = (disabled) => ({
  zIndex: 200,
  color: disabled ? 'grey.300' : undefined,
  '& .MuiBottomNavigationAction-label': {
    fontSize: '9px',
    '&.Mui-selected': {
      fontSize: '9px',
    }
  }
});

const BottomMenu = ({actions, onActionChange}) => {
  return <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2000}} elevation={3}>
    <BottomNavigation
      sx={navigationStyle}
      onChange={onActionChange}
    >
      {
        actions.map(({id, content, label, disabled, action}) => {
          const actionStyleMemo = useMemo(() => actionStyle(disabled), [disabled]);
          return <BottomNavigationAction
            disabled={disabled}
            sx={actionStyleMemo}
            key={id}
            label={label}
            icon={content}
            onClick={action}
          />;
        })
      }
    </BottomNavigation>
  </Paper>
  ;
};

BottomMenu.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    content: PropTypes.element,
  })),
  selectedActionId: PropTypes.string,
  onActionChange: PropTypes.func
};

export default BottomMenu;