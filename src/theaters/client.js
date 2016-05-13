
import request from 'superagent'


export const Theater = {

  list(){
    return make_promise( request.get(`/api/theater/`) )
  },

  get(id){
    return make_promise( request.get(`/api/theater/${id}`) )
  },

  save(id,formData) {
    const r = request
      .post(`/api/theater/${id}`)
      .send(formData)
      .set('Accept', 'application/json')

    return make_promise( r )
  },

  create(formData) {
    const r = request
      .post(`/api/theater/`)
      .send(formData)
      .set('Accept', 'application/json')
    return make_promise( r )
  },

  remove(id){
    return make_promise( request.delete(`/api/theater/${id}`) )
  }
}


export const Show = {

  list(teatherId){
    return make_promise( request.get(`/api/theater/${teatherId}/`) )
  },

  create(teaterId, formData) {
    const r = request
      .post(`/api/theater/${teaterId}/`)
      .send(formData)
      .set('Accept', 'application/json')
    return make_promise( r )
  },

  save(teaterId,showId,formData) {
    const r = request
      .post(`/api/theater/${teaterId}/${showId}`)
      .send(formData)
      .set('Accept', 'application/json')

    return make_promise( r )
  },




  remove(theaterId, showId){
    return make_promise( request.delete(`/api/theater/${theaterId}/${showId}`) )
  }


}


export const loadTheaterAndShows=(teatherId)=> {
  return Promise.all([Theater.get(teatherId), Show.list(teatherId) ]).then( (results)=> {
    return {theater:results[0].body, shows:results[1].body}
  })
}


function make_promise( r ){
  const req = r
  return new Promise((resolve, reject) => {
    req.set('Accept', 'application/json')
    .end( (err, res) => {
      err ? reject(err) : resolve(res);
    })
  }).then( res=> res.body)
}
