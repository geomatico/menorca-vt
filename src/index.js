import ReactDOM from 'react-dom';
import React from 'react';
import TwinMaps from './components/TwinMaps';

const App = () => {
  const initialState = {
    initialLon: 4.0695,
    initialLat: 39.944,
    initialZoom: 10,
    leftStyle: 'menorca_base_vector.json',
    rightStyle: 'menorca_base_raster.json',
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <TwinMaps {...initialState} />;
};

const target = document.getElementById('app');
if (target) ReactDOM.render(<App />, target);

export default App;
