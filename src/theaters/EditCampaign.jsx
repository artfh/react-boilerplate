import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'


import {createFormData} from '../forms'
import {saveShow} from './actions2'
import CampaignForm from './CampaignForm'


@connect(
  (state, ownProps)=> {
    console.log(ownProps.params.campaignId);
    return {
      theater: state.theater,
      campaign: _.first(state.campaigns.filter( e=> ownProps.params.campaignId === e._id.$oid ))
    }
  },
  { saveShow }
)
export default class EditCampaign extends React.Component {

  handleSubmit(value, files) {
    var formData = createFormData(value, files)
    this.props.saveShow(this.props.params.theaterId, this.props.params.showId, formData)
    console.log("create show", this.props.params);
  }

  render() {

    const {theater} = this.props
    console.log("create campaign", this.props.campaign);

    return <div>
      <h2 className="page-header">{  theater?theater.name:'-'} <small>Edit Campaign</small></h2>
      <CampaignForm show={this.props.campaign} onSubmit={this.handleSubmit.bind(this)}/>
    </div>;
  }
}
