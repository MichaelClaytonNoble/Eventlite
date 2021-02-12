
import React from 'react';
import {Link} from 'react-router-dom'; 
import {withRouter} from 'react-router'; 
class SessionEmailForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {email: ''}
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.handleChange = this.handleChange.bind(this); 
    this.loginDemoUser = this.loginDemoUser.bind(this);
  }

  handleSubmit(e){
    
    if(this.props.emailExists){
      this.props.history.push('/signin/login');
    }
    else{
      this.props.history.push('/signin/signup');
    }
  }
  
  handleChange(e){
    localStorage.setItem('email', e.target.value);
    this.props.findIfEmailExists(e.target.value);
    this.setState({email: e.target.value});
  }

  loginDemoUser(e) {
    e.preventDefault();
    this.props.demoLogin();
    this.setState();
  }
  render(){
    let submitButton, message, header, demoLoginButton = '';
    let disabled = 'disabled'; 
    if (this.props.location.pathname === "/signin" ){
      disabled = '';
      submitButton = <button id="session-form-submit">Get Started</button>;
      demoLoginButton = <button id="session-form-demo-login-button" onClick={this.loginDemoUser}>Demo User</button>;
      header = <h1 id="header"> Sign up or log in</h1>;
    }
    if(this.props.location.pathname ==='/signin/login'){
      header = <h1 id="header">Welcome back</h1>;
      message = <p id="session-login-message">Please enter your password to log in</p>;
    }
    return (
      <div id="session-email-form">
        <span id="session-email-form-header">
          <h1 id="header-logo">e</h1>
        </span>
        <form id="session-form" onSubmit={this.handleSubmit}>
          {header}
          {message}
          <input id="session-form-input" type="text" required placeholder="Email address" 
              onChange={this.handleChange} value={this.state.email} disabled={disabled}/>
          {submitButton}
          <p id="session-email-form-or">or</p>
          {demoLoginButton}
          
        </form>
      </div>
    );
  }
}
export default withRouter(SessionEmailForm)