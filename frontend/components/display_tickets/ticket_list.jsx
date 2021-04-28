import React from 'react'
import TicketListItem from './ticket_list_item';

class TicketList extends React.Component{

  constructor(props){
    super(props);
    
  }

  createTicketsList(){
    return this.props.tickets.map( (ticket, key) => {
      return <TicketListItem key={key} ticket={ticket}/>
    });
  }

  render(){
    return(
      <ul id="tickets-list" onChange={this.props.onChange}>
        <li id="ticket-list-item">
          <div id="name" className="header">Ticket</div>
          <div id="paid" className="header">Cost</div>
          <div id="max" className="header">Total tickets</div>
          <div id="quantity" className="header">Quantity</div>
        </li>
        {this.createTicketsList()}
      </ul>
    )
  }
};
export default TicketList;