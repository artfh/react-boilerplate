import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'


import {createFormData} from '../forms'
import {saveShow} from './actions2'
import ShowForm from './ShowForm'


@connect(
  (state, ownProps)=> {
    console.log(ownProps.params.showId);
    return {
      theater: state.theater,
      show: _.first(state.shows.filter( e=> ownProps.params.showId === e._id.$oid ))
    }
  },
  { saveShow }
)
export default class EditShow extends React.Component {

  handleSubmit(value, files) {
    var formData = createFormData(value, files)
    this.props.saveShow(this.props.params.theaterId, this.props.params.showId, formData)
    console.log("create show", this.props.params);
  }

  render() {

    const {theater} = this.props
    console.log("create show", this.props.show);

    return <div>
      <h2 className="page-header">{  theater?theater.name:'-'} <small>Edit Show</small></h2>
      <ShowForm show={this.props.show} onSubmit={this.handleSubmit.bind(this)}/>
    </div>;
  }
}
