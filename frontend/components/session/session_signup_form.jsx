
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
    this.handleEmail=this.handleEmail.bind(this); 
                
    this.errorMessage = '';
  }
  componentDidMount(){
    this.clearErrors();
  }
  componentWillUnmount(){
    this.clearErrors();
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
  handleEmail(e){

    localStorage.email=e.target.value;
    this.setState({});
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
          <label className="session-form-input-label"><p>Email address</p>
            <input className="session-form-input" type="text" required onChange={this.handleEmail}
              value={localStorage.email}/>
          </label>
          <label className="session-form-input-label"><p>Confirm email</p>
            <input className="session-form-input" type="text"
                  onChange={this.handleChange('email')} value={this.state.email}/>
          </label>
          <span id="session-signup-info-form-name">
            <label className="session-form-input-half-label"><p>First name</p>
              <input className="session-form-half-input" type="text" 
                  onChange={this.handleChange('first_name')} value={this.state.first_name}/>
            </label>
            <label className="session-form-input-half-label"><p>Last name</p>
              <input className="session-form-half-input" type="text" 
                  onChange={this.handleChange('last_name')} value={this.state.last_name}/>
            </label>
          </span>
          <label className="session-form-input-label"><p>Password</p>
            <input className="session-form-input" type="password"
                onChange={this.handleChange('password')} value={this.state.password}/> 
          </label>
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