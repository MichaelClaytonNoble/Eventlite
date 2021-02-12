
import React from 'react';
import {Link} from 'react-router-dom';
class SessionSignupForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
                  email: '',
                  password: '',
                  firstName: '',
                  lastName: ''
                }
  }

  handleChange(field){
    return (e)=>{
      this.setState({[field]: e.target.value})
    }
  }
  render(){
    return(
      <div id="session-signup-form">
        <form id="session-signup-info-form">

          <input id="session-form-input" type="text" placeholder="Confirm email" />

          <span id="session-signup-info-form-name">
            <input id="session-form-half-input" type="text" placeholder="First Name" />
            <input id="session-form-half-input" type="text" placeholder="Last Name" />
          </span>

          <input id="session-form-input" type="password" placeholder="Password" /> 

          <p id="password-message">Your password must be at least 8 characters</p>
          <button id="session-form-submit">Sign Up</button>
        </form>
        <Link to="/signin" id="link-to-signup-login">Log In Instead</Link>
        <p id="session-footer">By clicking "Sign Up" I accept the Eventbrite Terms Of Service, 
        <br /> Community Guidelines and have read the Privacy Policy.</p>
      </div>
    )
  }
}

export default SessionSignupForm;