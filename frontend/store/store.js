import {createStore, applyMiddleware} from 'redux';
import logger from 'react-redux';

import rootReducer from '../reducers/root';
import thunk from 'react-redux';

const configureStore = (preloadedState = {}) => {
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger));
}

