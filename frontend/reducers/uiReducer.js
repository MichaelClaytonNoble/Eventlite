import {combineReducers} from 'redux'; 
import modalReducer from './modal'; 
import paginateReducer from './paginate';
const uiReducer = combineReducers({
  modal: modalReducer,
  paginate: paginateReducer
});

export default uiReducer;