import React from 'react';
import {Redirect} from 'react-router-dom';

import HeaderNavBar from './header/header_nav_bar';
import SessionLoginFormContainer from './session/session_login_form_container';

import SessionEmailFormContainer from './session/session_email_form_container'; 

import {Route} from 'react-router-dom'; 
import {ProtectedRoute} from '../util/route_util.jsx'; 
import {AuthRoute} from '../util/route_util.jsx';


const App = () => {
    return (
      <div id="App">
        <HeaderNavBar /> 
        <AuthRoute path="/signin" component={SessionEmailFormContainer} />
        <AuthRoute exact path="/signin/login" component={SessionLoginFormContainer} />
      </div>
    )
  }

export default App; 