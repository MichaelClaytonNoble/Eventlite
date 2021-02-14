import React from 'react';
import {Link} from 'react-router-dom'; 

class SessionLoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = { email: '', password: ''};
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.handleChange = this.handleChange.bind(this); 
    this.clearErrors=false;
  }

  componentDidMount(){
    this.state.email = localStorage.email;
    localStorage.clear(); 
  }
  componentDidUpdate(){
    if(this.clearErrors){
      this.props.clearErrors();
    }
    this.clearErrors = false; 
  }

  handleSubmit(e){
    this.props.login(this.state);
    this.setState();
  }
   
  handleChange(e){
    this.clearErrors = true;
    this.setState({password: e.target.value})
  }

  render(){
    let submitButton, message, header, demoLoginButton, or = '';
    let disabled = '';
 

      header = <h1 id="header">Welcome back</h1>;
      message = <p id="session-login-message">Please enter your password to log in.</p>;
    
    return(
      <div id="session-login-form">
        <span id="session-form-header">
          <h1 id="header-logo">e</h1>
        </span>
        <form id="session-form" onSubmit={this.handleSubmit}>
          {header}
          {message}
          <input className="session-form-input" type="text" required placeholder="Email address"
            value={localStorage.email} disabled />
          <input className="session-form-input" type="password" placeholder="password" onChange={this.handleChange}/>
        <ul id="session-login-form-errors">
          {
            this.props.errors.map( (error, i) => {
              return <li key={i}>{error}</li>
            })
          }
        </ul>
          <button id="session-form-submit">Log in</button>
        </form>
        <Link to="/signin/signup" id="link-to-signup-login">Sign Up</Link>

      </div>
    )
  }
}
export default SessionLoginForm;