import thunk from 'redux-thunk';
import logger from './logger';
import storage from './storage';
import { applyMiddleware } from 'redux';

export default applyMiddleware(
  thunk,
  logger,
  storage,
);
