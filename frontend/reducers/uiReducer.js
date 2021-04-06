import {combineReducers} from 'redux'; 
import modalReducer from './modal'; 
const uiReducer = combineReducers({
  modal: modalReducer
});

export default uiReducer;