import {postUser} from '../util/users';

export const RECEIVE_NEW_USER = "RECEIVE_NEW_USER";

const receiveNewUser = user => ({
  type: RECEIVE_NEW_USER,
  user
});


//will be used in the containers 
export const createNewUser = user => dispatch => {
  return postUser(user)
  .then( user => dispatch(receiveNewUser(user)))
}

window.createNewUser = createNewUser; 