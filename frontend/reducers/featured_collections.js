
import { RECEIVE_FEATURED_COLLECTIONS } from '../actions/featured_collections';

const featuredCollectionsReducer = (state = {}, action) =>{

  Object.freeze(state);
  const nextState = Object.assign({}, state); 

  switch(action.type){

    case RECEIVE_FEATURED_COLLECTIONS:
      return Object.assign(nextState, action.collections);
    default: 
      return state;
  };
}

export default featuredCollectionsReducer;