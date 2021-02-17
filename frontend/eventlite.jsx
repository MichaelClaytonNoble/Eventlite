import React from 'react';
import ReactDOM from 'react-dom';

import {logout, login, findUserByEmailForSession} from './actions/session'
import {signup} from './actions/users';
import configureStore from './store/store';
import Root from './components/root';

import { createEvent } from './actions/events';

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

  windowStuff(store);
 
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
})

const windowStuff = (store)=>{
  window.signup = signup;
  window.logout = logout;
  window.login = login;
  window.findUserByEmailForSession = findUserByEmailForSession;

  window.dispatch = store.dispatch;
  window.getState = store.getState;
  window.createEvent = createEvent;
}