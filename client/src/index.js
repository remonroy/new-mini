import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import reportWebVitals from './reportWebVitals';
import jwtDecode  from 'jwt-decode'
import {Provider} from 'react-redux';
import store from './Store/index';
import * as Types from '../src/Store/actions/types'

const token = localStorage.getItem('Auth_token')
if (token) {
  const decodeToken =jwtDecode(token)
  store.dispatch({
    type:Types.SET_USER,
    payload:{
      user:decodeToken
    }
  })
}

const data = localStorage.getItem('order');
if (data) {
  
  store.dispatch({
    type:Types.SHOW_LOCAL_PRODUCT,
    payload:{
      info:JSON.parse(data)
    }
  })
}




ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
