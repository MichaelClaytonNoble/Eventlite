
import React from 'react';
import {Link} from 'react-router-dom';
class SessionSignupForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
                  email: '',
                  password: '',
                  first_name: '',
                  last_name: '',
                  matchEmail: ''
                }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.emailMessage = this.emailMessage.bind(this); 
    this.displayErrors = this.displayErrors.bind(this); 
    this.clearErrors = this.clearErrors.bind(this); 

    this.errorMessage = '';
  }
  
  clearErrors(){
    this.props.clearErrors();
    this.errors = {matchEmail: ''};
  }
  displayErrors(){

      return(
        <ul id="session-login-form-errors">
          {
            this.props.errors.map((error, i) => {

              if(error === "Email has already been taken"){
                if (this.state.email !== localStorage.email) {
                  return '';
                }
                else{
                  return <li key={i}>{error}</li>
                }
              }
              else{
                return <li key={i}>{error}</li>
              }
            })
          }
          {this.state.matchEmail === true ? '' : this.state.matchEmail === false ? <li>Emails must match</li> : ''}
        </ul>
      )
  }
  handleChange(field){
    return (e)=>{
      this.setState({[field]: e.target.value})
    }
  }
  handleSubmit(e){
    e.preventDefault();

    this.props.signup(this.state)
    .fail( ()=> this.state.email !== localStorage.email ?
                                      this.setState({matchEmail: false})
                                      : this.setState({matchEmail: true}));
    
  }
  passwordMessage(){
    if(this.state.password.length >= 6){
      return '';
    }
    return (<p id="password-message">Your password must be at least 6 characters</p>)
  }
  emailMessage(){

      if (this.state.email === localStorage.email){
        return '';
      }
      return (<li>Emails must match</li>)
  }
  render(){
    let message, header = '';
    header = <h1 id="header">Welcome</h1>
    message = <p id="session-login-message">Create an account.</p>;
    
    return(
      <div id="session-signup-form">
        <span id="session-form-header">
          <img id="header-image" src={window.stickMan} />
        </span>
        <form id="session-signup-info-form" onSubmit={this.handleSubmit}>
        {header}
        {message}
          <input className="session-form-input" type="text" required placeholder="Email address"
            value={localStorage.email} disabled/>
          <input className="session-form-input" type="text" placeholder="Confirm email" 
                onChange={this.handleChange('email')} value={this.state.email}/>
          <span id="session-signup-info-form-name">
            <input className="session-form-half-input" type="text" placeholder="First Name" 
                onChange={this.handleChange('first_name')} value={this.state.first_name}/>
            <input className="session-form-half-input" type="text" placeholder="Last Name" 
                onChange={this.handleChange('last_name')} value={this.state.last_name}/>
          </span>

          <input className="session-form-input" type="password" placeholder="Password" 
              onChange={this.handleChange('password')} value={this.state.password}/> 
            {this.displayErrors()}
          
          <button id="session-form-submit" type="submit">Sign Up</button>
        </form>

        <Link to="/signin" id="link-to-signup-login">Log In Instead</Link>
        
        <p id="session-footer">By clicking "Sign Up" I accept the Eventlite Terms Of Service,
        <br /> Community Guidelines and have read the Privacy Policy.</p>
      </div>
    )
  }
}

export default SessionSignupForm;