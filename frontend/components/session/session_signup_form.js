
import React from 'react';

class SessionSignupForm extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div id="session-signup-form">
        <h1 id="header">Welcome back</h1>
        <form id="session-signup-info-form">

          <input id="session-form-input" type="text" placeholder="Confirm email" />

          <span id="session-signup-info-form-name">
            <input id="session-form-half-input" type="text" placeholder="First Name" />
            <input id="session-form-half-input" type="text" placeholder="Last Name" />
          </span>

          <input id="session-form-input" type="password" placeholder="Password" /> 

          <p id="">Your password must be at least 8 characters</p>
          button = <button id="session-form-submit">Sign Up</button>
        </form>
        <Link to="/signin/login">Log In Instead</Link>
      </div>
    )
  }
}

export default SessionSignupForm;