import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { AuthProvider } from 'fireview';
import * as firebase from 'firebase';

render(
  <AuthProvider auth={firebase.auth()}>
    <App />
  </AuthProvider>, document.getElementById('root'));
registerServiceWorker();
