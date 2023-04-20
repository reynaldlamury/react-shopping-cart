import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';
import App from './App';
import { StateProvider } from './StateProvider';
import reducer, { beginState } from './reducer';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider beginState={beginState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
//
