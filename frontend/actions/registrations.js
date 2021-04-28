import * as REGUtil from '../util/registrations';

export const RECEIVE_REGISTRATION = 'RECEIVE_REGISTRATION';
export const RECEIVE_REGISTRATIONS = 'RECEIVE_REGISTRATIONS';
export const REMOVE_REGISTRATION = 'REMOVE_REGISTRATION';
export const CLEAR_REGISTRATIONS = 'CLEAR_REGISTRATIONS';


const receiveRegistration = registration => ({
  type: RECEIVE_REGISTRATION,
  registration
});

const receiveRegistrations = registrations => ({
  type: RECEIVE_REGISTRATIONS,
  registrations
});

export const clearRegistrations = () => ({
  type: CLEAR_REGISTRATIONS
});

const removeRegistration = registrationId => ({
  type: REMOVE_REGISTRATION,
  registrationId
});

export const fetchRegistration = registrationId => dispatch => {
  return REGUtil.pullRegistration(registrationId)
    .then( registration => dispatch(receiveRegistration(registration)), err => console.log(err.responseJSON))
};

export const fetchRegistrations = () => dispatch => {
  return REGUtil.pullRegistrations()
    .then( registrations => dispatch(receiveRegistrations(registrations)), err => console.log(err.responseJSON))
};

export const deleteRegistration = registrationId => dispatch => {
  return REGUtil.destroyRegistration(registrationId)
    .then( registration => dispatch(removeRegistration(registration)), err => console.log(err.responseJSON))
};

export const updateRegistration = registration => dispatch => {
  return REGUtil.patchRegistration(registration)
    .then( registration => dispatch(receiveRegistration(registration)), err => console.log(err.responseJSON))
}

export const createRegistration = registration => dispatch => {
  return REGUtil.postRegistration(registration)
    .then( registration => dispatch(receiveRegistration(registration)), err => console.log(err.responseJSON))
}