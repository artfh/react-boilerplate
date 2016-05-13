import * as client from './client'
import { push } from 'react-router-redux'


export async function loadTheaters(): Promise {
    const list = await client.Theater.list()
    return {
      type: 'LOADED_THEATERS',
      list,
    }
}


async function _loadTheater(theaterId): Promise {

    const theater = await client.Theater.get(theaterId)
    return {
      type: 'LOADED_THEATER',
      theater,
    }
}


export function loadTheater(theaterId) {
    return (dispatch) => {
      const result = _loadTheater(theaterId)
      result.then( (r)=> {
        dispatch(r)
        dispatch(loadShows(theaterId))
      })
      return result
    }
}


export async function saveTheater(theaterId, formData): Promise {
    const theater = await client.Theater.save(theaterId,formData)
    return {
      type: 'SAVED_THEATER',
      theater
    }
}


async function _createTheater(formData): Promise {
    const theater = await client.Theater.create(formData)
    return {
      type: 'CREATED_THEATER',
      theater
    }
}

export function createTheater(formData) {
    return (dispatch) => {
      const result = _createTheater(formData)
      result.then( (r)=> {
        dispatch(r)
        dispatch(push(`/theaters/v/${r.theater._id.$oid}`))
      })
      return result
    }
}


export async function removeTheater(t): Promise {
    const theater = await client.Theater.remove(t._id.$oid)
    return {
      type: 'REMOVED_THEATER',
      theater:t
    }
}


export async function loadShows(theaterId): Promise {
    const shows = await client.Show.list(theaterId)
    return {
      type: 'LOADED_SHOWS',
      shows,
    }
}



async function _createShow(theaterId, formData): Promise {
    const show = await client.Show.create(theaterId,formData)
    return {
      type: 'CREATED_SHOW',
      show
    }
}

export function createShow(theaterId,formData) {
    return (dispatch) => {
      const result = _createShow(theaterId, formData)
      result.then( (r)=> {
        dispatch(r)
        dispatch(push(`/theaters/v/${theaterId}`))
      })
      return result
    }
}

export async function removeShow(theaterId, show): Promise {
    const s = await client.Show.remove(theaterId,show._id.$oid)
    return {
      type: 'REMOVED_SHOW',
      show
    }
}


async function _saveShow(theaterId, showId, formData): Promise {
    const show = await client.Show.save(theaterId,showId,formData)
    return {
      type: 'SAVED_SHOW',
      show
    }
}

export function saveShow(theaterId, showId, formData) {
    return (dispatch) => {
      const result = _saveShow(theaterId,showId,formData)
      result.then( (r)=> {
        dispatch(r)
        dispatch(push(`/theaters/v/${theaterId}`))
      })
      return result
    }
}


export function fetchTheater(theaterId) {
    return (dispatch, state) => {
      if (state.theater && state.theater._id.$oid==theaterId) {
        console.log("theater already loaded",theaterId, state.theater);
      } else {
        dispatch( loadTheater(theaterId) )
      }
    }
}
