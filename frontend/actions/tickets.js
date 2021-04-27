import * as TicketUTIL from '../util/tickets';


export const RECEIVE_TICKET = 'RECEIVE_TICKET';
export const RECEIVE_TICKETS = 'RECEIVE_TICKETS';
export const REMOVE_TICKET = 'REMOVE_TICKET';
export const CLEAR_TICKETS = 'CLEAR_TICKETS';
export const RECEIVE_TICKET_ERRORS = 'RECEIVE_TICKET_ERRORS';

export const receiveTicket = ticket => ({
  type: RECEIVE_TICKET,
  ticket
});

export const receiveTickets = tickets => ({
  type: RECEIVE_TICKETS,
  tickets
});

export const removeTicket = ticketId => ({
  type: REMOVE_TICKET,
  ticketId
}); 

export const clearTickets = () => ({
  type: CLEAR_TICKETS
}); 

export const receiveTicketErrors = (errors) => ({
  type: RECEIVE_TICKET_ERRORS,
  errors
});


export const createTicket = ticket => dispatch=> {
  return TicketUTIL.postTicket(ticket)
    .then( ticket => dispatch(receiveTicket(ticket)), err => dispatch(receiveTicketErrors(err.responseJSON)))
}

export const fetchTicket = ticketId => dispatch => {
  return TicketUTIL.pullTicket(ticketId)
    .then( ticket => dispatch(receiveTicket(ticket)), err => dispatch(receiveTicketErrors(err.responseJSON)))
};

export const fetchTickets = eventId => dispatch => {
  return TicketUTIL.pullTickets(eventId)
    .then( tickets => dispatch(receiveTickets(tickets)), err => dispatch(receiveTicketErrors(err.responseJSON)))
};

export const fetchMyTickets = () => dispatch => {
  return TicketUTIL.pullMyTickets()
    .then( tickets => dispatch(receiveTickets(tickets)), err => dispatch(receiveTicketErrors(err.responseJSON)))
};


export const deleteTicket = ticketId => dispatch => {
  return TicketUTIL.destroyTicket(ticketId)
    .then( ticket => dispatch(removeTicket(ticket)), err => dispatch(receiveTicketErrors(err.responseJSON)))
};

export const updateTicket = ticket => dispatch => {
  return TicketUTIL.patchTicket(ticket)
    .then( ticket => dispatch(receiveTicket(ticket)), err => dispatch(receiveTicketErrors(err.responseJSON)))
};

