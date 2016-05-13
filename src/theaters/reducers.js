import {THEATERS_FETCH,THEATERS_FETCH_SUCCESS,THEATERS_FETCH_FAILURE,THEATERS_RESET} from './actions'
import {THEATER_FETCH,THEATER_FETCH_SUCCESS,THEATER_FETCH_FAILURE} from './actions'
import {THEATER_SAVE,THEATER_SAVE_SUCCESS,THEATER_SAVE_FAILURE} from './actions'


const INITIAL_STATE = { theaterList: {theaters: [], error:null, loading: false}, activeTheater: null }

export const theaterReducer = (state = INITIAL_STATE, action) => {

  switch(action.type) {

  case THEATERS_FETCH:
  	return { ...state, theaterList: {theaters:[], error: null, loading: true} };
  case THEATERS_FETCH_SUCCESS:
    return { ...state, theaterList: {theaters: action.payload, error:null, loading: false} };
  case THEATERS_FETCH_FAILURE:
    return { ...state, theaterList: {theaters: [], error: action.error, loading: false} };


    case THEATER_FETCH:
      return { ...state, activeTheater: {theater:null, error: null, loading: true} };
    case THEATER_FETCH_SUCCESS:
      return { ...state, activeTheater: {theater: action.payload, error:null, loading: false} };
    case THEATER_FETCH_FAILURE:
      return { ...state, activeTheater: {theater: null, error: action.error, loading: false} };


    case THEATER_SAVE_SUCCESS:
        return { ...state, activeTheater: {theater: action.payload, error:null, loading: false} };


  case THEATERS_RESET:
    return { ...state, theaterList: {theaters: [], error:null, loading: false} };

  default:
    return state;
  }

}
