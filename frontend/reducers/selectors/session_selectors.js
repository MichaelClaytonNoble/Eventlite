

export const selectSessionErrors = (state) => {
  return state.errors.session;
}


export const selectAllErrors = (state) => {
  return state.errors.session.concat(state.errors.users); 
}
