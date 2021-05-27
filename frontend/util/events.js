
export const postEvent = event =>{
  return $.ajax({
    method: "POST",
    url: "/api/events",
    data: {event}
  }); 
};

export const patchEvent = event =>{
  if(event instanceof FormData){
    return $.ajax({
      method: "PATCH",
      url: `/api/events/${event.id}`,
      data: event,
      contentType: false,
      processData: false
    });
  }
  return $.ajax({
    method: "PATCH",
    url: `/api/events/${event.id}`,
    data: {event}
  });
};

export const destroyEvent = eventId => {
  return $.ajax({
    method: "DELETE",
    url: `/api/events/${eventId}`
  });
};

export const pullAllEvents = () => {
  return $.ajax({
    method: "GET", 
    url: '/api/events'
  });
};

export const pullEventsByType = (column, value) =>{
  return $.ajax({
    method: "GET",
    url: '/api/events/getByType',
    data: {column, value}
  });
};
export const pullMyEventsByType = (column, value) =>{
  return $.ajax({
    method: "GET",
    url: '/api/events/getMineByType',
    data: {column, value}
  });
};

export const browseEvents = (options) => {

  return $.ajax({
    method: "GET",
    url: '/api/events/browse',
    data: {options} 
  });
};