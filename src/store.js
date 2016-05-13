'use strict';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import { theaterReducer } from './theaters/reducers'

import { theaters, theater, shows } from './theaters/reducers2'


import { routerMiddleware } from 'react-router-redux'
import { hashHistory, browserHistory } from 'react-router'



const rootReducer = (state = { msg:'test'}, action) => {
  //console.log('reduce',state,action);
  switch (action.type) {
    case 'SEND_MESSAGE':
      return {  ...state, msg:'test11111' };

    case 'LOAD_USERS':
        return {
          ...state,
          msg: action.state,
          users:action.data
         };

  }
  return state
};


const msg = (state = 'test' , action) => {
  switch (action.type) {
    case 'SEND_MESSAGE':
      return 'aaaaaaa!';
  }
  return state
};


const users = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_USERS':
        return action.data || [];
  }
  return state
};


const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}


function warn(error) {
  console.warn(error.message || error);
  throw error; // To let the caller handle the rejection
}

const promise = store => next => action =>
  typeof action.then === 'function'
    ? Promise.resolve(action).then(next, warn)
    : next(action);


const reducers = combineReducers({theaters,theater,shows, theaterReducer})


// Apply the middleware to the store
const router = routerMiddleware(hashHistory)


export const  store = createStore(  reducers ,applyMiddleware (router,thunkMiddleware,promise, logger));
