import { divide } from 'lodash';
import React from 'react'
import TicketList from '../display_tickets/ticket_list'; 

class TicketModal extends React.Component{

  constructor(props){
    super(props);

    this.state={

    }
    this.handleChange = this.handleChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.registration = {};
  }


  handleChange(e){

    const ticketId = e.target.dataset.ticketid;
    const eventId = this.props.event.id;
    const quantityPurchased = e.target.value;

    this.registration[ticketId]={
      event_id: eventId,
      quantity_purchased: quantityPurchased,
      ticket_id: ticketId
    }

  }
  handleSubmit(e){
    e.preventDefault();
    let registrations = Object.values(this.registration);
    registrations.forEach( (registration, i) => {

      if(i === registrations.length-1){
        this.props.createRegistration(registration)
        .then(this.props.closeModal);
      }
      else{
        this.props.createRegistration(registration)
      }
    });

  }

  render(){
    if(!this.props.modal){return null;}
    return (
      <div id="modal-background" onClick={this.props.closeModal}>
        <div id="ticket-modal" onClick={e => e.stopPropagation()}>
          <div id="ticket-list-wrap">
            <div id="ticket-title">
              <div id="title">{this.props.event.title}</div>
              <div id="start"></div>
            </div>
            <div id="ticket-list">
              <TicketList onChange={this.handleChange} tickets={this.props.tickets}/>
            </div>
            <div id="checkout-button-wrap" className="form-buttons">
              <button className="form-discard-button" onClick={this.props.closeModal}>Cancel</button>
              <button className="form-submit-button" onClick={this.handleSubmit}>Register</button>
            </div>
          </div>
          <div id="ticket-cart">
            <div id="event-img">
              <img src={this.props.event.imageUrl} alt="" />
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