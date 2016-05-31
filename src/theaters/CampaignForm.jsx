import React from 'react';
import { Link } from 'react-router';
import { LinkContainer,IndexLinkContainer } from 'react-router-bootstrap';

import { Tabs, Tab } from '../utils/tabs';
import {Form,Input,Select, RichText,ImageInput,ButtonGroup, TextInput,createFormData} from '../forms'



export default class CampaignForm extends React.Component {

  constructor(props) {
    super(props);
    var show  = props.show || {}
    this.state = { data: show }
  }


  render() {

    var options = [ {k:'a', v:'A'},{k:'b', v:'B'}]
    return (
      <Form
        value={this.state.data}
        no-validation
        onSubmit={ this.props.onSubmit }>
        <Select name="show._id.$oid" options={ options } optionKey='k' optionLabel='v' label="Show"/>
        <Input name="offer.value"/>
        <Input name="offer.details"/>

        <Input name="short_description"/>
        <RichText name="full_description" />

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
