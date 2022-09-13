import ReactDOM from 'react-dom';
import React from 'react';

import {Provider} from 'react-redux';
import store from './store';

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Login from './components/Login';
import Expedients from './views/expedients';

const App = () => {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme()}>
          <CssBaseline/>
          <Login>
            <Expedients />
          </Login>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
};

const target = document.getElementById('app');
if (target) ReactDOM.render(<App />, target);

export default App;