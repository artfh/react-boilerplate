import React from 'react';
import { Link } from 'react-router';
import { LinkContainer,IndexLinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import moment from 'moment'
import later from 'later'
import _ from 'lodash'


import {  Image } from '../forms/image'

import { fetchTheater } from './actions2'

//moment.locale('de');
later.date.localTime()

@connect(
  (state, ownProps)=> {
    console.log(ownProps.params.showId);
    return {
      theater: state.theater,
      show: _.first(state.shows.filter( e=> ownProps.params.showId === e._id.$oid ))
    }
  },
  { fetchTheater }
)
export default class Show extends React.Component {

  componentDidMount() {

    var cron = '00 18 * * 1,2 *'
    var s = later.parse.cron(cron);

    var a = later.schedule(s).next(10);
    //console.log('--------',a);
    a.forEach( m => console.log(m))


    console.log('-______',new Date());

    this.props.fetchTheater(this.props.params.theaterId)
  }


  render() {
    const {theater, show} = this.props



    if (!theater || !show ) return null

    var showtimes = []
    if(show.crons && show.start_date && show.end_date){

      const start_date=moment(show.start_date['$date']).toDate()
      const end_date=moment(show.end_date['$date']).toDate()


      console.log(start_date,end_date)
      showtimes =_.split(show.crons,'\n').filter(e=>e!="")
        .map( e=>later.parse.cron(e)).map( e=> later.schedule(e).next(1000, start_date,end_date))

console.log("-", showtimes);


      showtimes = _.flatten(showtimes).sort( (a,b) => {
        return a>b? 1 : (a<b)?-1:0
      })

    }

    //showtimes.forEach( m => console.log("->", m.toISOString() ))

    //console.log('showtimes',showtimes );

    return <div>
      <h2 className="">
        <LinkContainer to={`/theaters/v/${this.props.theater._id.$oid}/`}>
        <a>{theater.name}</a>
          </LinkContainer>
      </h2>

      <h3>
        <LinkContainer to={`/theaters/v/${this.props.theater._id.$oid}/shows/e/${show._id.$oid}`}>
          <button className="btn btn-default pull-right">Edit</button>
        </LinkContainer>

        {show.title}<br/><small>{show.subtitle}</small>


      </h3>

      <div className="row">
        <div className="col-md-6 col-sm-6">
          <div dangerouslySetInnerHTML={{__html: show.teaser}}></div>
        </div>
        <div className="col-md-6">
              <Image imageId={show.landscape_image} className="thumbnail"/>
                <Image imageId={show.portrait_image} className="thumbnail"/>

                <h3 className="page-header">Termine</h3>

              {showtimes.map( s => (
                <p>{moment(s).format('dddd DD.MM.YYYY HH:mm')}</p>
              ))}

          </div>
      </div>

    </div>;
  }
}



export class DateString extends React.Component {

  render() {
    var { format, value } = this.props
    if (!value) return null
    var v = moment(value['$date']).format('DD.MM.YYYY')
    return <span>{v}</span>
  }

}
