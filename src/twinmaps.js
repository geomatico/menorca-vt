import ReactDOM from 'react-dom';
import React, {useMemo} from 'react';
import {TwinMaps} from '@geomatico/geocomponents';

import config from './config.json';

const {initialViewport} = config;

const calcInitialViewport = () => {
  let newViewport = {...initialViewport};
  if (document.URL.includes('#')){
    try {
      const [zoom, latitude, longitude, bearing=0, pitch=0] =
        document.URL
          .split('#')[1]
          .split('/')
          .map(param => parseFloat(param));
      newViewport = {
        ...initialViewport,
        zoom, latitude, longitude, bearing, pitch
      };
    }
    // eslint-disable-next-line no-empty
    finally {
    }
  }
  return newViewport;
};

const App = () => {
  const leftStyle = 'menorca_base_vector.json';
  const rightStyle = 'menorca_base_raster.json';

  const initialViewPort = useMemo(calcInitialViewport, []);

  return <TwinMaps
    leftStyle={leftStyle}
    rightStyle={rightStyle}
    initialViewport={initialViewPort}
  />;
};

const target = document.getElementById('app');
if (target) ReactDOM.render(<App />, target);

export default App;
