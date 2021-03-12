import {RECEIVE_CATEGORIES_ERRORS} from '../actions/categories'; 
import {CLEAR_ERRORS} from '../actions/events'
const categoriesErrorsReducer = (state=[], action) => {

  switch(action.type){
    case RECEIVE_CATEGORIES_ERRORS:
      return action.errors;
    case CLEAR_ERRORS:
      return [];
    default: 
      return state; 
  };
}; 

export default categoriesErrorsReducer; 
