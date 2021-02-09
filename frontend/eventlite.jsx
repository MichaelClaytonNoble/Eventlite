import React from 'react';
import ReactDOM from 'react-dom';
import postUser from './util/users';

document.addEventListener('DOMContentLoaded', ()=>{

  window.postUser = postUser; 
  const root = document.getElementById('root');
  ReactDOM.render(<div>React DOM </div>, root);
})