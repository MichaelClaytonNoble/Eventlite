export const INCREMENT_CURRENT_PAGE = "INCREMENT_CURRENT_PAGE"; 
export const DECREMENT_CURRENT_PAGE = "DECREMENT_CURRENT_PAGE";
export const SET_PER_PAGE = "SET_PER_PAGE";
export const SET_PAGE_NEIGHBOR = "SET_PAGE_NEIGHBOR";
export const RESET_PAGINATE = "RESET_PAGINATE";


export const incrementPage = () => {
  return {
    type: INCREMENT_CURRENT_PAGE
  }
};

export const decrementPage = () => {
  return {
    type: DECREMENT_CURRENT_PAGE
  }
};

export const setPageLimit = pageLimit => {
  return {
    type: SET_PER_PAGE,
    perPage: pageLimit
  }
}; 

export const setPageNeighbor = pageNeighbor => {
  return{
    type: SET_PAGE_NEIGHBOR,
    pageNeighbor
  }
};

export const resetPaginate = () => {
  return{
    type: RESET_PAGINATE
  }
}

export const resetPage = () => dispatch =>{
  return new Promise( function(resolve,reject){
    dispatch(resetPaginate())
  });
}