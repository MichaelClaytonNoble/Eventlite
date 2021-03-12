import { patchEvent, postEvent, pullEventsByType, postImage } from '../util/events';
export const RECEIVE_CURRENT_EVENT="RECEIVE_CURRENT_EVENT";
export const RECEIVE_EVENT_ERRORS ="RECEIVE_EVENT_ERRORS"; 
export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const CLEAR_ERRORS ="CLEAR_ERRORS"; 
export const CLEAR_EVENTS ="CLEAR_EVENTS"; 

const receiveNewEvent = event =>({
  type: RECEIVE_CURRENT_EVENT,
  event
});

const receiveEventErrors = errors => ({
  type: RECEIVE_EVENT_ERRORS,
  errors
})

const receiveEvents = events => ({
  type: RECEIVE_EVENTS,
  events
})

export const clearEvents = () => ({
  type: CLEAR_EVENTS
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


export const getEventsByType = (col,val) => dispatch =>{
  return pullEventsByType(col,val)
    .then(events => dispatch(receiveEvents(events)), err => dispatch(receiveEventErrors(err.responseJSON)));
}
