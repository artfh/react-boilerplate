import React from 'react';

import { Link } from 'react-router';
import { LinkContainer,IndexLinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import _ from 'lodash'
import {  Image } from '../forms/image'
import { fetchTheater } from './actions2'


@connect(
  (state, ownProps)=> {
    console.log(ownProps.params.showId);

    const campaign=_.first(state.campaigns.filter( e=> ownProps.params.campaignId === e._id.$oid ))
    var show = null
    if (campaign)
      show =  _.first(state.shows.filter( e=> campaign.show.$oid === e._id.$oid ))

    return {
      theater: state.theater,
      campaign,
      show
    }
  },
  { fetchTheater }
)
export default class Campaign extends React.Component {

  componentDidMount() {
    this.props.fetchTheater(this.props.params.theaterId)
  }


  render() {
    const {theater, show, campaign} = this.props
    if (!theater || !show || !campaign ) return null
    return <div>

      <h2 className="">
      <LinkContainer to={`/theaters/v/${theater._id.$oid}/`}>
      <a>{theater.name}</a>
        </LinkContainer>
    </h2>

    <h3>
      <LinkContainer to={`/theaters/v/${theater._id.$oid}/shows/v/${show._id.$oid}`}>
        <button className="btn btn-default pull-right">View Show</button>
      </LinkContainer>

      <LinkContainer to={`/theaters/v/${theater._id.$oid}/campaigns/e/${campaign._id.$oid}`}>
        <button className="btn btn-default pull-right">Edit</button>
      </LinkContainer>

      {show.title}<br/><small>{show.subtitle}</small>


    </h3>

    </div>
  }

}
