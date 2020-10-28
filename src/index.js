import ReactDOM from 'react-dom';
import React from 'react';

const App = () => (
  <div>Hola mundo</div>
);

const target = document.getElementById('app');
if (target) ReactDOM.render(<App />, target);

export default App;
