
export const postEvent = event =>{
  return $.ajax({
    method: "POST",
    url: "/api/events",
    data: {event}
  }); 
}

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
}

export const pullEventsByType = (column, value) =>{
  return $.ajax({
    method: "GET",
    url: '/api/events/getByType',
    data: {column, value}
  })
}