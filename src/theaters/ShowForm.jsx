import React from 'react';
import { Link } from 'react-router';
import { LinkContainer,IndexLinkContainer } from 'react-router-bootstrap';

import { Tabs, Tab } from '../utils/tabs';
import {Form,Input,RichText,ImageInput,ButtonGroup, TextInput,createFormData} from '../forms'



export default class ShowForm extends React.Component {

  constructor(props) {
    super(props);
    var show  = props.show || {}
    this.state = { data: show }
  }


  render() {
    return (
      <Form
        value={this.state.data}
        no-validation
        onSubmit={ this.props.onSubmit }>
        <Input name="title"/>
        <Input name="subtitle"/>
        <ImageInput name="landscape_image"
           thumbWidth={320}
           thumbHeight={180} fixedSize={ {w:320,h:180} }/>

         <ImageInput name="portrait_image"
              thumbWidth={80}
              thumbHeight={110} fixedSize={ {w:80,h:110} }/>


        <RichText name="teaser" />

          <Input name="start_date" type="date"/>
          <Input name="end_date"  type="date"/>

        <TextInput name="crons" style={{height:120}}/>


        <ButtonGroup>
          <button
            className="btn btn-success"
            style={{marginRight:'5px'}}>Save</button>
        </ButtonGroup>

      </Form>
    );
  }
}
