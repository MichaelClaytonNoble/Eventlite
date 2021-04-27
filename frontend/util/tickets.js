

export const postTicket = ticket => {

  return $.ajax({
    method: 'POST',
    url: '/api/tickets',
    data: {ticket}
  });
};

export const patchTicket = ticket => {

  return $.ajax({
    method: 'PATCH',
    url: `/api/tickets/${ticket.id}`,
    data: {ticket}
  });
};


export const destroyTicket = ticketId => {

  return $.ajax({
    method: 'DELETE',
    url: `/api/tickets/${ticketId}`
  });
};

export const pullTicket = ticketId => {

  return $.ajax({
    method: 'GET',
    url: `/api/tickets/${ticketId}`
  });
};

export const pullTickets = eventId => {

  return $.ajax({
    method: 'GET',
    url: `/api/tickets`,
    data: {event_id: eventId}
  });
};

export const pullMyTickets = () => {

  return $.ajax({
    method: 'GET',
    url: '/api/tickets/myIndex'
  });
};