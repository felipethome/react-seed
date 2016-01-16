var React = require('react');
var ReactDOM = require('react-dom');
var HelloWorld = require('components/hello-world/hello-world.js');

ReactDOM.render(
  <HelloWorld />,
  document.getElementById('hello-world') // Id of a container element
);