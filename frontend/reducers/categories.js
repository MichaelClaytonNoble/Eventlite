import {RECEIVE_CATEGORIES} from '../actions/categories';

const categoriesReducer = (state ={}, action) => {

  Object.freeze(state); 
  const nextState = Object.assign({}, state); 

  switch(action.type){
    case RECEIVE_CATEGORIES:
      nextState = Object.assign(state, action.categories);
      return nextState;
    default:
      return state; 
  }
};

export default categoriesReducer;