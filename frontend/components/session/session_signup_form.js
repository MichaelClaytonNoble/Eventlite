
import React from 'react';
import {Link} from 'react-router-dom';
class SessionSignupForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
                  email: '',
                  password: '',
                  first_name: '',
                  last_name: ''
                }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.errors = {matchEmail: ''};
    this.errorFlag = false;
  }
  
  componentWillUnmount(){
    
  }
  displayErrors(){
      return(
        <ul id="session-login-form-errors">
          {
            this.props.errors.concat(Object.values(this.errors)).map((error, i) => {
              return <li key={i}>{error}</li>
            })
          }
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
    if(this.state.email === localStorage.email){
      this.props.signup(this.state);
      this.props.history.push('/');
    }
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
      return (<p id="email-message">Emails must match</p>)
  }
  render(){
    return(
      <div id="session-signup-form">
        <form id="session-signup-info-form" onSubmit={this.handleSubmit}>

          <input id="session-form-input" type="text" placeholder="Confirm email" 
                onChange={this.handleChange('email')} value={this.state.email}/>
          <span id="session-signup-info-form-name">
            <input id="session-form-half-input" type="text" placeholder="First Name" 
                onChange={this.handleChange('first_name')} value={this.state.first_name}/>
            <input id="session-form-half-input" type="text" placeholder="Last Name" 
                onChange={this.handleChange('last_name')} value={this.state.last_name}/>
          </span>

          <input id="session-form-input" type="password" placeholder="Password" 
              onChange={this.handleChange('password')} value={this.state.password}/> 

            {this.displayErrors()}
            {this.emailMessage()}
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