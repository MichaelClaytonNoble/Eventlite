import {createStore, applyMiddleware} from 'redux';

import rootReducer from '../reducers/root';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

const middlewares = [thunk];

if (process.env.NODE_ENV !== "production") {
  // must use 'require' (import only allowed at top of file)
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}
const configureStore = (preloadedState = {}) => {
  return createStore(rootReducer, preloadedState, applyMiddleware(...middlewares));
  // return createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger));
}

export default configureStore;
