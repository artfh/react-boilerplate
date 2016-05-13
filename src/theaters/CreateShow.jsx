import React from 'react';
import { connect } from 'react-redux';


import {createFormData} from '../forms'
import {createShow} from './actions2'
import ShowForm from './ShowForm'


@connect(
  state=> ({ theater: state.theater }),
  { createShow }
)
export default class CreateShow extends React.Component {

  handleSubmit(value, files) {
    var formData = createFormData(value, files)
    this.props.createShow(this.props.params.theaterId, formData)
    console.log("create show", this.props.params);
  }

  render() {
    const {theater} = this.props
    console.log("create show", this.props.params.theaterId);

    return <div>
      <h2 className="page-header">{  theater?theater.name:'-'} <small>Add Show</small></h2>
      <ShowForm onSubmit={this.handleSubmit.bind(this)}/>
    </div>;
  }
}
