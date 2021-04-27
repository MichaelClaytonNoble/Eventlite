import {merge} from 'lodash'
import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
  RECEIVE_EMAIL_FOR_SESSION
} from '../../actions/session';


let _nullSession = {
  currentUser: {
    id: null
  },
  newSession: {
    emailExists: false
  }
};

const sessionReducer = (state = _nullSession, action) => {
  Object.freeze(state);
  const nextState = merge({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      nextState.currentUser.id = action.user.id;
      nextState.newSession = {emailExists: false};
      return nextState;
    case RECEIVE_EMAIL_FOR_SESSION:
      nextState.newSession.emailExists = action.newSession.emailExists;
      return nextState;
    case LOGOUT_CURRENT_USER:
      return _nullSession;
    default:
      return state;
  }
};

export default sessionReducer;