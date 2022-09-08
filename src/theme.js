import { createTheme } from '@mui/material/styles';

const theme = (mode) => createTheme({
  palette: {
    mode: mode || 'light',
    primary: {
      main: '#AEBD04',
      contrastText: '#fff',
    },
    secondary: {
      main: '#228042',
    }
  }
});

export default theme;
