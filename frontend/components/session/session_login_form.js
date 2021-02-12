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
    return(
      <div id="session-login-form">
        <form id="session-form" onSubmit={this.handleSubmit}>
        
          <input id="session-form-input" type="password" placeholder="password" onChange={this.handleChange}/>
        <ul id="session-login-form-errors">
          {
            this.props.errors.map( (error, i) => {
              return <li key={i}>{error}</li>
            })
          }
        </ul>
          <button id="session-form-submit">Log in</button>
        </form>
      </div>
    )
  }
}
export default SessionLoginForm;