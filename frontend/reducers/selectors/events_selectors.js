/**
 * 3 fields are added. These fields are the result of some anaylsis like
 * based on the date, the event status could be 'past'. Number of tickets 
 * sold etc. 
 * 
 * @param {Array} events A list events.
 * @return {Array} events with added fields (status, gross, ticketsSold)
 */
export function analyzeEvents(events){
  const analyzedEvents = events.map( event=> determineStatus(event));
  return analyzedEvents; 
}

/**
 * An event can have a status of 
 *  completed profile - "the profile is completed",
 *  incomplete profile - "the profile is incomplete but posted",
 *  past -"the event end date has passed"
 * 
 * @param {pojo} event a single event
 * @return {pojo} the event with an added status field
 */
function determineStatus(event){
  let eventWithStatus = event;
  
  eventWithStatus['status'] = "Incomplete"; 

  if(event.about && event.description){
    eventWithStatus['status'] = "Complete";
  }
  console.log("end", event.end, "now", new Date())
  if(new Date(event.end) < new Date()){
    eventWithStatus['status'] = 'Past';
  }
  return eventWithStatus;
}

function calculateGrossFromTickets(){
  return 0;
}