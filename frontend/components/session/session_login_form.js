import React from 'react';

class SessionLoginForm extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
  }
   
  render(){
    return(
      <div id="session-login-form">
        <form>
          <label htmlFor="email-input"> Email address
            <input id="email-input" type="text"/>
          </label>
          
          <label htmlFor="password-input">password
            <input id="password-input" type="password" />
          </label>
        </form>
      </div>
    )
  }
}
export default SessionLoginForm;