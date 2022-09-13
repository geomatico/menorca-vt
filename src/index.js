import ReactDOM from 'react-dom';
import React, {useState} from 'react';

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Login from './components/Login';
import Expedients from './views/Expedients';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const handleLogout = () => setLoggedIn(false);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme()}>
        <CssBaseline/>
        <Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}>
          <Expedients onLogout={handleLogout}/>
        </Login>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

const target = document.getElementById('app');
if (target) ReactDOM.render(<App />, target);

export default App;
