import * as client from './client'

export const THEATERS_FETCH = 'THEATERS_FETCH'
export const THEATERS_FETCH_SUCCESS = 'THEATERS_FETCH_SUCCESS'
export const THEATERS_FETCH_FAILURE = 'THEATERS_FETCH_FAILURE'

export const THEATERS_RESET = 'THEATERS_RESET'

export const THEATER_FETCH = 'THEATER_FETCH'
export const THEATER_FETCH_SUCCESS = 'THEATER_FETCH_SUCCESS'
export const THEATER_FETCH_FAILURE = 'THEATER_FETCH_FAILURE'


export const THEATER_SAVE = 'THEATER_SAVE'
export const THEATER_SAVE_SUCCESS = 'THEATER_SAVE_SUCCESS'
export const THEATER_SAVE_FAILURE = 'THEATER_SAVE_FAILURE'


export const fetchTheaters = ()=>{
  return requestAction(client.Theater.list(), THEATERS_FETCH,THEATERS_FETCH_SUCCESS,THEATERS_FETCH_FAILURE )
}

export const fetchTheater = (theaterId)=>{
  console.log('fetchTheater',theaterId);
  return requestAction(client.Theater.get(theaterId), THEATER_FETCH,THEATER_FETCH_SUCCESS,THEATER_FETCH_FAILURE )
}


export const saveTheater = (theaterId, formData)=>{
  console.log('saveTheater', theaterId, formData );
  return requestAction(client.Theater.save(theaterId,formData), THEATER_SAVE,THEATER_SAVE_SUCCESS,THEATER_SAVE_FAILURE )
}


const requestAction = (promise, actionType, actionSuccessType, actionFailureType)=>{

  return (dispatch, getState)=>{
      dispatch({ type: actionType})
      promise.then(
        (response)=>{
          dispatch({  type: actionSuccessType,payload: response.body})
        },
        (error)=>{
          dispatch({  type: actionFailureType,error: error})
        }
      );
  }

}
