import React from 'react';

class SessionLoginForm extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.handleChange = this.handleChange.bind(this); 
  }

  componentDidMount(){
  }

  handleSubmit(e){

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