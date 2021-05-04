import React from 'react';
import {withRouter} from 'react-router-dom';
class Modal extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  modalDisplay(){
    let buttonList;
    switch(this.props.modal){
      case 'deleteEvent':
        buttonList = [{name: "Delete", action: ()=>this.props.deleteEvent(this.props.myId).then(this.props.closeModal)}, {name:"Cancel", action:this.props.closeModal}];
        return (
          <div id="modal-main">
            {this.modalMessage("Permanently delete this event?")}
            {this.buttonWrap(buttonList)}
          </div>
        )
        break;
      case 'eventCreated':
        buttonList = [{name: "Okay", action: this.props.closeModal}];
        return(
          <div id="modal-main">
            {this.modalMessage("Event has been fully created")}
            {this.buttonWrap(buttonList)};
          </div>
        )
        break;
      case 'logIn':
        buttonList = [{name: "Log in", action: ()=> {this.props.history.push('/signin'); this.props.closeModal()}}, {name: "Cancel", action: this.props.closeModal}];
        return (
          <div id="modal-main">
            {this.modalMessage("Log in to follow this event")}
            {this.buttonWrap(buttonList)}
          </div>
        )
    }
  }
  buttonWrap(buttonList){
    return (
      <div id="modal-button-wrap">
        {buttonList.map( (button, key)=>{
          return <button key={key} className="modal-button" onClick={button.action}>{button.name}</button>
        })}
      </div>
    )
  }
  modalMessage(message){
    return(
      <div id="modal-message">{message}</div>
    )
  }
  render(){
    if(!this.props.modal){return null;}
    return (
      <div id="modal-background" onClick={this.props.closeModal}>
        <div id="modal" onClick={e => e.stopPropagation()}>
          {this.modalDisplay()}
        </div>
      </div>
    );
  }
}

export default withRouter(Modal);