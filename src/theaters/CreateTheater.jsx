import React from 'react';
import { connect } from 'react-redux';


import {createFormData} from '../forms'
import {createTheater} from './actions2'
import TheaterForm from './TheaterForm'


@connect(
  null,
  { createTheater }
)
export default class CreateTheater extends React.Component {

  handleSubmit(value, files) {
    var formData = createFormData(value, files)
    this.props.createTheater(formData)
    console.log("create theater");
  }

  render() {
    return <div>
      <h2 className="page-header">Add Theater</h2>
      <TheaterForm onSubmit={this.handleSubmit.bind(this)}/>
    </div>;
  }
}
