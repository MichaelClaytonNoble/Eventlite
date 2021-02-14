import React from 'react';
import {Redirect} from 'react-router-dom';

import HeaderNavBarContainer from './header/header_nav_bar';
import SessionLoginFormContainer from './session/session_login_form_container';
import SessionSignupFormContainer from './session/session_signup_form_container';
import SessionEmailFormContainer from './session/session_email_form_container'; 

import {Route} from 'react-router-dom'; 
import {ProtectedRoute} from '../util/route_util.jsx'; 
import {AuthRoute} from '../util/route_util.jsx';

const permittedHash = [];
permittedHash.push('#/');
permittedHash.push('#/signin');
permittedHash.push('#/signin/login');
permittedHash.push('#/signin/signup');


class App extends React.Component{

  render(){
    // if(!permittedHash.includes(location.hash)){
    //   return (
    //     <Redirect to="#/"></Redirect>
    //   )
    // }
    return (
      <div id="App">
        <HeaderNavBarContainer /> 
        <AuthRoute path="/signin" component={SessionEmailFormContainer} />
        <AuthRoute exact path="/signin/login" component={SessionLoginFormContainer} />
        <AuthRoute exact path="/signin/signup" component={SessionSignupFormContainer} />
      </div>
    )
  }
}

export default App; 