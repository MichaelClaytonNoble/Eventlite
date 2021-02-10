import React from 'react';
import ReactDOM from 'react-dom';
import {postUser} from './util/users';
import {logout, login} from './actions/session'
import {createNewUser} from './actions/users';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', ()=>{
  const store = configureStore();

  window.createNewUser = createNewUser;
  window.logout = logout;
  window.login = login;
  window.dispatch = store.dispatch;
  window.getState = store.getState;
  
  
  const root = document.getElementById('root');
  ReactDOM.render(<div>React DOM </div>, root);
})