import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getLoggedIn} from '../selectors';
import {LoginModal} from '@geomatico/geocomponents';
import {setLoggedIn} from '../actions';

const Login = ({children}) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getLoggedIn);

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
    const url = `https://${process.env.TILE_HOST}/geoserver/ordenacio_restringit/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&STYLES&LAYERS=${process.env.EXPEDIENTS_LAYER}&exceptions=application%2Fvnd.ogc.se_inimage&WIDTH=256&HEIGHT=256&SRS=EPSG%3A25831&BBOX=597373.8302330114%2C4424719.863198288%2C597679.2360766889%2C4425025.269041965`;
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
          dispatch(setLoggedIn(true));
        } else { // Unauthorized
          setErrorMessage(onMount ? '' : 'Login incorrecte');
          dispatch(setLoggedIn(false));
        }
      })
      .catch(() => {
        setPassword('');
        setErrorMessage(onMount ? '' : 'Error de xarxa');
        dispatch(setLoggedIn(false));
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

export default Login;
