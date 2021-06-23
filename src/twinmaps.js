import ReactDOM from 'react-dom';
import React from 'react';
import {TwinMaps} from '@geomatico/geocomponents';

const App = () => {
  const leftStyle = 'menorca_base_vector.json';
  const rightStyle = 'menorca_base_raster.json';

  return <TwinMaps
    leftStyle={leftStyle}
    rightStyle={rightStyle}
  />;
};

const target = document.getElementById('app');
if (target) ReactDOM.render(<App />, target);

export default App;
