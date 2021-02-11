import React from 'react';
import HeaderNavBar from './header/header_nav_bar';
import SessionLoginFormContainer from './session/session_login_form_container';

import SessionEmailFormContainer from './session/session_email_form_container'; 

import {Route} from 'react-router-dom'; 


const App = () => {
  return (
    <div id="App">
      <HeaderNavBar/> 
      <Route path="/signin" component={SessionEmailFormContainer} />
      <Route path="/signin/login" component={SessionLoginFormContainer} />
    </div>
  )
}

export default App; 