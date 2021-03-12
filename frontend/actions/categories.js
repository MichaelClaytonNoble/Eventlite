
import {getCategories} from '../util/category';
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"; 
export const RECEIVE_CATEGORIES_ERRORS = "RECEIVE_CATEGORIES_ERRORS"; 

const receiveCategories = (categories) => ({
  type: RECEIVE_CATEGORIES,
  categories
}); 
const receiveCategoriesErrors = errors => ({
  type: RECEIVE_CATEGORIES_ERRORS,
  errors
}); 

export const pullCategories = () => dispatch => {
  return getCategories()
    .then( categories => dispatch(receiveCategories(categories)));
}