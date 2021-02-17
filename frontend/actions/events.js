import {postEvent} from '../util/events';
export const RECEIVE_CURRENT_EVENT="RECEIVE_CURRENT_EVENT";
export const RECEIVE_EVENT_ERRORS ="RECEIVE_EVENT_ERRORS"; 

const receiveNewEvent = event =>({
  type: RECEIVE_CURRENT_EVENT,
  event
});

const receiveEventErrors = errors => ({
  type: RECEIVE_EVENT_ERRORS,
  errors
})
export const createEvent = event => dispatch =>{
  return postEvent(event)
  .then( event => dispatch(receiveNewEvent(event)), err =>dispatch(receiveEventErrors(err.responseJSON))); 
}