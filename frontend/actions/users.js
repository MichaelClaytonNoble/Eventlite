import {postUser} from '../util/users';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";

const receiveNewUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

//will be used in the containers 
export const createNewUser = user => dispatch => {
  return postUser(user)
  .then( user => dispatch(receiveNewUser(user)))
  //.catch( err => dispatch(receiveNewError(err)))
}