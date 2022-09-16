import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import LoginModal from '@geomatico/geocomponents/LoginModal';

import config from '../config.json';

const Login = ({isLoggedIn, setLoggedIn, children}) => {

  const [username, setUsername] = useState(localStorage.getItem('menorca.expedients.user') || '');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    handleLogin(
      username,
      localStorage.getItem('menorca.expedients.password'),
      true
    );
  }, []);

  const handleLogin = (user, pass, onMount) => {
    // Test a GetMap request on the protected layer, with basic auth
    const url = config.services.wms.replace('{layer}', Object.values(config.datasets)[0].layer);
    setErrorMessage('Comprovant credencials...');
    fetch(url, {
      headers: new Headers({
        'Authorization': `Basic ${btoa(`${user}:${pass}`)}`
      })
    })
      .then((response) => {
        setPassword('');
        if (response.status === 200) {
          localStorage.setItem('menorca.expedients.user', user);
          localStorage.setItem('menorca.expedients.password', pass);
          setErrorMessage(undefined);
          setLoggedIn(true);
        } else { // Unauthorized
          setErrorMessage(onMount ? '' : 'Login incorrecte');
          setLoggedIn(false);
        }
      })
      .catch(() => {
        setPassword('');
        setErrorMessage(onMount ? '' : 'Error de xarxa');
        setLoggedIn(false);
      });
  };

  if (isLoggedIn) {
    return children;
  } else {
    return <LoginModal
      username={username}
      password={password}
      onUsernameChanged={setUsername}
      onPasswordChanged={setPassword}
      onLoginButtonClicked={() => handleLogin(username, password)}
      loginErrorMessage={errorMessage}
    />;
  }
};

Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired
};

export default Login;
