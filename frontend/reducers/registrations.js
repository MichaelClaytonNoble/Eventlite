import * as REGActions from '../actions/registrations';

const registrationsReducer = (state={}, action) => {

  Object.freeze(state);
  let nextState = Object.assign({}, state); 

  switch(action.type){

    case REGActions.RECEIVE_REGISTRATION:
      nextState[action.registration.id] = action.registration;
      return nextState;
    case REGActions.RECEIVE_REGISTRATIONS:
      nextState = Object.assign(nextState, action.registration);
      return nextState;
    case REGActions.REMOVE_REGISTRATION:
      delete nextState[action.registration.id];
      return nextState;
    case REGActions.CLEAR_REGISTRATIONS: 
      return {};
    default:
      return state;
  }

};

export default registrationsReducer;