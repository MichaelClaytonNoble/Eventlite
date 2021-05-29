import { patchEvent, postEvent, pullEventsByType, 
  pullMyEventsByType, postImage, destroyEvent, pullAllEvents, browseEvents } from '../util/events';
  
export const RECEIVE_CURRENT_EVENT="RECEIVE_CURRENT_EVENT";
export const RECEIVE_EVENT_ERRORS ="RECEIVE_EVENT_ERRORS"; 
export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const RECEIVE_EVENTS_BY_USER = "RECEIVE_EVENTS_BY_USER";
export const CLEAR_ERRORS ="CLEAR_ERRORS"; 
export const CLEAR_EVENTS ="CLEAR_EVENTS"; 
export const CLEAR_USER_EVENTS = "CLEAR_USER_EVENTS"; 
export const CLEAR_MY_EVENTS = "CLEAR_MY_EVENTS"
export const REMOVE_EVENT = "REMOVE_EVENT"; 

const receiveNewEvent = event =>({
  type: RECEIVE_CURRENT_EVENT,
  event
});

const removeEvent = (event, myId) => ({
    type: REMOVE_EVENT,
    event,
    myId
})

const receiveEventErrors = errors => ({
  type: RECEIVE_EVENT_ERRORS,
  errors
})

const receiveEvents = events => ({
  type: RECEIVE_EVENTS,
  events
})
const receiveEventsByUser = events => ({
  type: RECEIVE_EVENTS_BY_USER,
  events
})

export const clearEvents = () => ({
  type: CLEAR_EVENTS
})
export const clearMyEvents = (id) => ({
  id: id,
  type: CLEAR_MY_EVENTS
})
export const clearUserEvents = () => ({
  type: CLEAR_USER_EVENTS
})

export const clearErrors = () =>({
  type: CLEAR_ERRORS
})

export const createEvent = event => dispatch =>{
  return postEvent(event)
    .then( event => dispatch(receiveNewEvent(event)), err =>dispatch(receiveEventErrors(err.responseJSON))); 
}

export const updateEvent = event => dispatch =>{
  return patchEvent(event)
    .then(event => dispatch(receiveNewEvent(event)), err => dispatch(receiveEventErrors(err.responseJSON))); 
}

export const deleteEvent = (eventId, myId) => dispatch => {
  return destroyEvent(eventId)
    .then( event=> dispatch(removeEvent(event, myId)), err => dispatch(receiveEventErrors(err.responseJSON))); 
}

export const getAllEvents = () => dispatch => {
  return (pullAllEvents()
    .then(events => dispatch(receiveEvents(events)), err=> dispatch(receiveEventErrors(err.responseJSON))));
}
              
export const getEventsByType = (col,val) => dispatch =>{

  if(col==='creator_id'){
    return (pullEventsByType(col,val)
    .then(events => dispatch(receiveEventsByUser(events)), err => dispatch(receiveEventErrors(err.responseJSON))));
  }
  else{
    return (pullEventsByType(col,val)
    .then(events => dispatch(receiveEvents(events)), err => dispatch(receiveEventErrors(err.responseJSON) ) ) );
  }
}
export const getMyEventsByType = (col,val) => dispatch =>{
  if(col==='creator_id'){
    return (pullMyEventsByType(col,val)
    .then(events => dispatch(receiveEventsByUser(events)), err => dispatch(receiveEventErrors(err.responseJSON))));
  }
  else{
    return (pullMyEventsByType(col,val)
    .then(events => dispatch(receiveEvents(events)), err => dispatch(receiveEventErrors(err.responseJSON) ) ) );
  }
}

export const searchEvents = (options) => dispatch => {
  debugger
  if( options["creator_id"] ){
    return ( browseEvents(options)
    .then( events => dispatch( receiveEventsByUser(events) ), err => dispatch( receiveEventErrors(err.responseJSON) ) ));
  }
  else{
    return ( browseEvents(options)
    .then( events => dispatch(receiveEvents(events) ), err => dispatch(receiveEventErrors(err.responseJSON))));
  }
}
