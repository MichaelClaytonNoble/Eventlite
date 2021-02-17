
//create new event

export const postEvent = event =>{
  return $.ajax({
    method: "POST",
    url: "/api/events",
    data: {event}
  }); 
}

