import {createMuiTheme} from '@material-ui/core/styles';

const theme = (type) => createMuiTheme({
  palette: {
    type: type ? type : 'light',
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
