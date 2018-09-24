import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Dashboard } from './components/Dashboard';
import configureStore from './store/configureStore';
import AppRouter, { history } from './routers/AppRouter';
import './css/main.scss';

const store = configureStore();

const jsx = (
  <Provider store={store}>
     <AppRouter/>
  </Provider>   
);

ReactDOM.render(
  jsx,
  document.getElementById('app')
);