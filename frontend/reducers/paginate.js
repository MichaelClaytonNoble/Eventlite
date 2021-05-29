import {INCREMENT_CURRENT_PAGE, DECREMENT_CURRENT_PAGE,
SET_PAGE_NEIGHBOR, SET_PER_PAGE,
RESET_PAGINATE} from '../actions/paginate';

let nullState = {
  page: 1,
  perPage: 10,
  pageNeighbor: 1
}
const paginateReducer = (state = nullState, action) =>{

  Object.freeze(state);
  let nextState = Object.assign({}, state);

  switch(action.type){
    case INCREMENT_CURRENT_PAGE:
      nextState['page']+=1;
      return nextState;
    case DECREMENT_CURRENT_PAGE:
      nextState['page']-=1;
      return nextState;
    case SET_PER_PAGE:
      nextState['perPage'] = action.perPage;
      return nextState;
    case SET_PAGE_NEIGHBOR:
      nextState['pageNeighbor'] = action.pageNeighbor;
      return nextState;
    case RESET_PAGINATE:
      nextState['page'] = 1;
      nextState['perPage'] = 10;
      nextState['pageNeighbor'] = 1;
    default: 
      return state;
  };
}

export default paginateReducer;