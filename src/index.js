import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { App } from "./components";

import { Toaster } from 'react-hot-toast'; //React Notification Package

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Toaster position='top-left' /> {/* Calling the Toaster component here, so that it works gloablly throughout our application */}
  </React.StrictMode>,
  document.getElementById('root')
);