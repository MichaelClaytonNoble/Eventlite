import React from 'react';
import ReactDOM from 'react-dom';
import {postUser} from './util/users';
import {logout, login} from './actions/session'
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', ()=>{
  const store = configureStore();

  window.postUser = postUser; 
  window.logout = logout;
  window.login = login;
  window.dispatch = store.dispatch;
  window.getState = store.getState;
  
  
  const root = document.getElementById('root');
  ReactDOM.render(<div>React DOM </div>, root);
})