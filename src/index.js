import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { App } from "./components";

import { Toaster } from 'react-hot-toast'; //React Notification Package
import { AuthProvider } from './providers/AuthProvider';

ReactDOM.render(
  <React.StrictMode>
    {/* Here we are using the AuthProvider as JSX, which internally wraps the elements inside it into a AuthContext Component. */}
    <AuthProvider>
      <App />
      <Toaster position='top-left' /> {/* Calling the Toaster component here, so that it works gloablly throughout our application */}
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);