
import React from 'react';
import {Link} from 'react-router-dom'; 
import {withRouter} from 'react-router'; 
class SessionEmailForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {email: ''}
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.handleChange = this.handleChange.bind(this); 
  }

  handleSubmit(e){
    // search for the users email in the database
    //if this exists in the database 
    //then push

    this.props.history.push('/signin/login');
  }

  handleChange(e){
    localStorage.setItem('email', e.target.value);
    this.setState({email: e.target.value});
  }
  render(){
    let button = ''; 
    if (this.props.location.pathname === "/signin" ){
      button = <button id="session-email-form-submit">Get Started</button>;
    }
    return (
      <div id="session-email-form">
        <span id="session-email-form-header">
          <h1 id="header-logo"></h1>
        </span>
        <form id="session-form" onSubmit={this.handleSubmit}>
          <h1 id="header"> Sign up or log in</h1>
          <input type="text" required placeholder="Email address" onChange={this.handleChange} value={this.state.email}/>
          {button}
        </form>
      </div>
    )
  }

}
export default withRouter(SessionEmailForm)