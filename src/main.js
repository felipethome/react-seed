import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './components/hello-world/hello-world.js';

ReactDOM.render(
  <HelloWorld />,
  document.getElementById('hello-world') // Id of a container element
);