import React from 'react';
import { Link } from 'react-router';
import { LinkContainer,IndexLinkContainer } from 'react-router-bootstrap';

import { Tabs, Tab } from '../utils/tabs';
import {Form,Input,RichText,ImageInput,ButtonGroup, TextInput,createFormData} from '../forms'




export default class TheaterForm extends React.Component {

  constructor(props) {
    super(props);
    var theater  = props.theater || {}
    this.state = { data: theater }
  }


  render() {
    return (
      <Form
        value={this.state.data}
        no-validation
        onSubmit={ this.props.onSubmit }>
        <Input name="name"/>
        <Input name="email"/>
        <Input name="homepage"/>
        <Input name="phone"/>
        <TextInput name="address" style={{height:60}}/>
        <RichText name="open_hours" />

        <ButtonGroup>
          <button
            className="btn btn-success"
            style={{marginRight:'5px'}}>Save</button>
        </ButtonGroup>

      </Form>
    );
  }
}
