
export const theaters = (state = [], action) => {

  switch(action.type) {
    case 'LOADED_THEATERS':
        return action.list

    case 'REMOVED_THEATER':
        return state.filter( e=> e._id.$oid != action.theater._id.$oid )

    default:
      return state
  }
}


export const theater = (state = null, action) => {
  switch(action.type) {
    case 'LOADED_THEATER':
        return action.theater
    case 'SAVED_THEATER':
            return action.theater
    default:
      return state
  }
}


export const shows = (state = [], action) => {
  switch(action.type) {
    case 'LOADED_SHOWS':
        return action.shows

    case 'REMOVED_SHOW':
          return state.filter( e=> e._id.$oid != action.show._id.$oid )

    case 'SAVED_SHOW':
          return state.map( e=> {
            if (e._id.$oid != action.show._id.$oid) return e
            return action.show
          })


    default:
      return state
  }
}
