# React Seed with ES6

Seed project for React. I based my work on this [repository](https://github.com/christianalfoni/react-app-boilerplate). Type one command and you will spawn a server with live-reload (any change made in one of your *jsx* or *css* files will automatically reload the page where the components/css are loaded). Type another command and you will be able to build a production version with all your *jsx* and *css* files concatenated and minified.

## React + Browserify + Babel + ESLint
This seed uses Browserify to support modules, Babel to transform your *jsx* files written with ES6 features in pure Javascript (ES5), and ESLint to help you keep your code free of bugs. It also has babel-stage-2 that includes features of the next version of ECMAScript that are in initial draft.

## Build

Clone this repository:
    
    git clone https://github.com/felipethome/react-seed-es6

Install dependencies:
    
    npm install

Run:
    
    npm run dev

Check http://localhost:8889

## Production version

Run:
    
    npm run deploy