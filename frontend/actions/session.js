import {
  postSession,
  deleteSession
} from '../util/session'


export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

const receiveSessionErrors = (errors) =>({
  type: RECEIVE_SESSION_ERRORS,
  errors
})

//we will be manually dispatch thing. 
//not through a thunk action creator 
export const clearSessionErrors = () => ({
  type: CLEAR_ERRORS
})

//thunk actions to be used in container  
export const login = formUser => dispatch => postSession(formUser)
  .then(user => dispatch(receiveCurrentUser(user)),(err) => dispatch(receiveSessionErrors(err.responseJSON)));

export const logout = () => dispatch => deleteSession()
  .then(() => dispatch(logoutCurrentUser()),(err)=> dispatch(receiveSessionErrors(err.responseJSON)));



