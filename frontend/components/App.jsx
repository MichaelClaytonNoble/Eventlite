import React from 'react';
import HeaderNavBar from './header/header_nav_bar';
import SessionLoginForm from './session/session_login_form';
import SessionEmailForm from './session/session_email_form'; 

import {Route} from 'react-router-dom'; 


const App = () => {
  return (
    <div id="App">
      <HeaderNavBar/> 
      <Route path="/signin" component={SessionEmailForm} />
      <Route path="/signin/login" component={SessionLoginForm} />
    </div>
  )
}

export default App; 