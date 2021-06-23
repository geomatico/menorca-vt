import ReactDOM from 'react-dom';
import React from 'react';

import {Provider} from 'react-redux';
import store from './store';

import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import Expedients from './views/expedients';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme()}>
        <CssBaseline/>
        <Expedients />
      </ThemeProvider>
    </Provider>
  );
};

const target = document.getElementById('app');
if (target) ReactDOM.render(<App />, target);

export default App;