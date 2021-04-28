import React from 'react'


const TicketListItem = ({ticket}) => {
  let paid = 'Free'
  if(ticket.paid){
    paid = "$ ";
    paid += parseInt(ticket.price);
  }

  return (
    <li id="ticket-list-item">
      <div id="name">{ticket.name}</div>
      <div id="paid">{paid}</div>
      <div id="max">{ticket.max_quantity}</div>
      <input type='number' data-ticketid={ticket.id} min='0' max='100' defaultValue='0'/>
    </li>
  )
};

export default TicketListItem;