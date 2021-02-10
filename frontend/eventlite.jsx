import React from 'react';
import ReactDOM from 'react-dom';
import {postUser} from './util/users';
import {logout, login} from './actions/session'
import {signup} from './actions/users';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', ()=>{
  let store;
  if (window.currentUser) {
    const { currentUser } = window;
    const { id } = currentUser;
    const preloadedState = {
      entities: {
        users: { [id]: currentUser }
      },
      session: { 
        currentUser: {id}
      }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  }
  else{
    store = configureStore();
  }

  window.signup = signup;
  window.logout = logout;
  window.login = login;
  window.dispatch = store.dispatch;
  window.getState = store.getState;
  
  
  const root = document.getElementById('root');
  ReactDOM.render(<div>React DOM </div>, root);
})