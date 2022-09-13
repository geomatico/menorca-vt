import React, {useEffect, useState} from 'react';
//GEOCOMPONENTS
import LoginModal from '@geomatico/geocomponents/LoginModal';
import PropTypes from 'prop-types';

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
    const url = `https://${process.env.TILE_HOST}/geoserver/ordenacio_restringit/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&STYLES&LAYERS=${process.env.EXPEDIENTS_CONSELL_LAYER}&exceptions=application%2Fvnd.ogc.se_inimage&WIDTH=256&HEIGHT=256&SRS=EPSG%3A25831&BBOX=597373.8302330114%2C4424719.863198288%2C597679.2360766889%2C4425025.269041965`;
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
