
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
    localStorage.clear();
  }

  componentDidMount(){
    this.props.clearErrors();
  }
  componentWillUnmount(){
    this.props.clearErrors();
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
    let submitButton, message, header, demoLoginButton, or = '';
    if (this.props.location.pathname === "/signin" ){
      submitButton = <button id="session-form-submit">Get Started</button>;
      demoLoginButton = <button id="session-form-demo-login-button" onClick={this.loginDemoUser}>Demo User</button>;
      or = <p id="session-email-form-or">or</p>;
      header = <h1 id="header"> Sign up or log in</h1>;
    }
    if(this.props.location.pathname ==='/signin/login'){
      header = <h1 id="header">Welcome back</h1>;
      message = <p id="session-login-message">Please enter your password to log in.</p>;
    }
    if(this.props.location.pathname === '/signin/signup'){
      header = <h1 id="header">Welcome</h1>
      message = <p id="session-login-message">Create an account.</p>;
    }
    return (
      <div id="session-email-form">
        <span id="session-form-header">
          <h1 id="header-logo">e</h1>
        </span>
        <form id="session-form" onSubmit={this.handleSubmit}>
          {header}
          {message}
          <label className="session-form-input-label"><p>Email address</p>
            <input className="session-form-input" type="text" required
                onChange={this.handleChange} value={this.state.email} />
          </label>
          {submitButton}
          {or}
          {demoLoginButton}
        </form>
        
      </div>
    );
  }
}
export default withRouter(SessionEmailForm)