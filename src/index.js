import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import Router from './Router';

// import Router from './Router'

// https://stackoverflow.com/questions/58282540/why-is-a-github-page-url-changing-on-load-causing-the-public-resource-path-to-b
const routerBaseName = process.env.PUBLIC_URL;

ReactDOM.render(
  <React.StrictMode>
    <Router basename={routerBaseName} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
