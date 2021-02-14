import React from 'react';
import {Redirect} from 'react-router-dom';

import HeaderNavBarContainer from './header/header_nav_bar';
import SessionLoginFormContainer from './session/session_login_form_container';
import SessionSignupFormContainer from './session/session_signup_form_container';
import SessionEmailFormContainer from './session/session_email_form_container'; 
import FooterNavBar from './footer/footer_nav_bar';

import {Route} from 'react-router-dom'; 
import {Switch} from 'react-router-dom';
import {ProtectedRoute} from '../util/route_util.jsx'; 
import {AuthRoute} from '../util/route_util.jsx';
import PageNotFound from './error/error_page';

class App extends React.Component{

  

  render(){

      localStorage.setItem('hash', location.hash);
      console.log(localStorage.hash); 
    return (
      <div id="App" >
        <HeaderNavBarContainer /> 
        <div id="main-content">
        <Switch>
          <AuthRoute exact path="/signin" component={SessionEmailFormContainer} />
          <AuthRoute exact path="/signin/login" component={SessionLoginFormContainer} />
          <AuthRoute exact path="/signin/signup" component={SessionSignupFormContainer} />
          <Route component={PageNotFound} />
        </Switch>
        </div>
        <FooterNavBar />
      </div>
    )
  }
}

export default App; 