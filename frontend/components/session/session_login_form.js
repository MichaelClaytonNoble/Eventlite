import React from 'react';

class SessionLoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = { email: '', password: ''};
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.handleChange = this.handleChange.bind(this); 
  }

  componentDidMount(){
    this.state.email = localStorage.email;
    localStorage.clear(); 
  }

  handleSubmit(e){

    this.props.login(this.state); 
    this.props.history.push('/')
  }
   
  handleChange(e){
    this.setState({password: e.target.value})
  }
  render(){
    return(
      <div id="session-login-form">
        <form id="session-form" onSubmit={this.handleSubmit}>
        
          <input id="session-form-input" type="password" placeholder="password" onChange={this.handleChange}/>
          <button id="session-form-submit">Log in</button>
        </form>
      </div>
    )
  }
}
export default SessionLoginForm;