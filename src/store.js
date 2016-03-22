'use strict';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

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

export const  store = createStore( combineReducers({msg, users}) ,applyMiddleware (thunkMiddleware,logger));
