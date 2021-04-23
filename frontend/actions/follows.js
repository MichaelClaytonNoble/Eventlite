
import {getFollows, postFollow, destroyFollow} from '../util/follows'; 

export const RECEIVE_FOLLOW = "RECEIVE_FOLLOW";
export const RECEIVE_FOLLOWS = "RECEIVE_FOLLOWS";
export const REMOVE_FOLLOW = "REMOVE_FOLLOW";
export const CLEAR_FOLLOWS = "CLEAR_FOLLOWS";


const receiveFollow = follow => ({
  type: RECEIVE_FOLLOW,
  follow
});

const receiveFollows = follows => ({
  type: RECEIVE_FOLLOWS,
  follows
});

const removeFollow = follow => ({
  type: REMOVE_FOLLOW,
  follow
});

const clearFollows = () => ({
  type: CLEAR_FOLLOWS
});

export const fetchFollows = () => dispatch => {
  return getFollows()
    .then( follows => dispatch(receiveFollows(follows)), err=>console.log(err.responseText));
};

export const createFollow = event_id => dispatch => {
  return postFollow(event_id)
    .then( follow => dispatch(receiveFollow(follow)), err => console.log(err.responseText));
};

export const deleteFollow = event_id => dispatch => {
  return destroyFollow(event_id)
    .then( follow => dispatch(removeFollow(follow)), err => console.log(err.responseText));
};
