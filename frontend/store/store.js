import {createStore, applyMiddleware} from 'redux';

import rootReducer from '../reducers/root';
import thunk from 'redux-thunk';

const configureStore = (preloadedState = {}) => {
  const middlewares = [thunk];

  if (process.env.NODE_ENV !== "production") {
    // must use 'require' (import only allowed at top of file)
    const { logger } = require("redux-logger");
    middlewares.push(logger);
  }
  return createStore(rootReducer, preloadedState, applyMiddleware(middlewares));
}

export default configureStore;
