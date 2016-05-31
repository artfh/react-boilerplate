import React from 'react';
import { connect } from 'react-redux';


import {createFormData} from '../forms'
import {createShow} from './actions2'
import CampaignForm from './CampaignForm'


@connect(
  state=> ({ theater: state.theater }),
  { createShow }
)
export default class CreateCampaign extends React.Component {

  handleSubmit(value, files) {
    //var formData = createFormData(value, files)
    //this.props.createShow(this.props.params.theaterId, formData)
    console.log("create show", value);
  }

  render() {
    const {theater} = this.props
    return <div>
      <h2 className="page-header">{  theater?theater.name:'-'} <small>Add Campaign</small></h2>

<CampaignForm onSubmit={this.handleSubmit.bind(this)}/>
    </div>;
  }
}
