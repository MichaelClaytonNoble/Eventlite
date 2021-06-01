import {INCREMENT_CURRENT_PAGE, DECREMENT_CURRENT_PAGE,
SET_PAGE_NEIGHBOR, SET_PER_PAGE,
RESET_PAGINATE, SET_LAST_PAGE} from '../actions/paginate';

let nullState = {
  page: 1,
  perPage: 12,
  pageNeighbor: 1
}
const paginateReducer = (state = nullState, action) =>{

  Object.freeze(state);
  let nextState = Object.assign({}, state);

  switch(action.type){
    case INCREMENT_CURRENT_PAGE:
      if( nextState['pageLimit'] ){
        ( nextState['page']+1 ) <= nextState['pageLimit'] ? nextState['page']+=1 : nextState['page'];
      }
      else{
        nextState['page']+=1;
      }
      return nextState;
    case DECREMENT_CURRENT_PAGE:
      nextState['page']-=1;
      if(nextState['page'] < 1) {
        nextState['page'] = 1;
      }
      return nextState;
    case SET_PER_PAGE:
      nextState['perPage'] = action.perPage;
      return nextState;
    case SET_PAGE_NEIGHBOR:
      nextState['pageNeighbor'] = action.pageNeighbor;
      return nextState;
    case SET_LAST_PAGE:
      nextState['page'] -= 1;
      nextState['lastPage'] = nextState['page'];
      return nextState;
    case RESET_PAGINATE:
      nextState['page'] = 1;
      nextState['perPage'] = 12;
      delete nextState['lastPage'];
    default: 
      return state;
  };
}

export default paginateReducer;