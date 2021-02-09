import React from 'react';
import ReactDOM from 'react-dom';
import {postUser} from './util/users';
import {logout} from './actions/session'

document.addEventListener('DOMContentLoaded', ()=>{

  window.postUser = postUser; 
  window.logout = logout;
  
  const root = document.getElementById('root');
  ReactDOM.render(<div>React DOM </div>, root);
})