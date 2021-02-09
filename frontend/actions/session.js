import {
  postSession,
  deleteSession
} from '../utils/session_api'


export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";

const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

//thunk actions to be used in container  
export const login = formUser => dispatch => postSession(formUser)
  .then(user => dispatch(receiveCurrentUser(user)));

export const logout = () => dispatch => deleteSession()
  .then(() => dispatch(logoutCurrentUser()));
