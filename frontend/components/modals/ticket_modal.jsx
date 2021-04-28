import { divide } from 'lodash';
import React from 'react'
import TicketList from '../display_tickets/ticket_list'; 

class TicketModal extends React.Component{

  constructor(props){
    super(props);
  }


  handleChange(e){
    console.log("current target", e.currentTarget);
    console.log("target", e.target.value); 

  }

  render(){
    if(!this.props.modal){return null;}
    return (
      <div id="modal-background" onClick={this.props.closeModal}>
        <div id="ticket-modal" onClick={e => e.stopPropagation()}>
          <div id="ticket-list-wrap">
            <div id="ticket-title">
              <div id="title">HELOLEOUHOEUHO oetuh onhOEU TNOH </div>
              <div id="start"> starts at your mom . com</div>
            </div>
            <div id="ticket-list">
              <TicketList onChange={this.handleChange} tickets={this.props.tickets}/>
            </div>
            <div id="checkout-button-wrap">

            </div>
          </div>
          <div id="ticket-cart">
            <div id="event-img">

            </div>
            <div id="cart-items">

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TicketModal;