
//create new event

export const postEvent = event =>{
  return $.ajax({
    method: "POST",
    url: "/api/events",
    data: {event}
  }); 
}


//add more info to the event via update

export const patchEvent = event =>{
  return $.ajax({
    method: "PATCH",
    url: `/api/events/${event.id}`,
    data: {event}
  });
}

