import React from 'react';
import { Link } from 'react-router';
import { LinkContainer,IndexLinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { Modal ,Button} from 'react-bootstrap';


import { Tabs, Tab } from '../utils/tabs';
import {createFormData} from '../forms'
import {loadTheater, saveTheater, removeShow} from './actions2'
import TheaterForm from './TheaterForm'

import Shows from './Shows'



@connect(
  state=> ({ theater: state.theater }),
  { loadTheater }
)
export default class Theater extends React.Component {

  componentDidMount(){
    this.props.loadTheater(this.props.params.theaterId)
  }

  render() {
    if(!this.props.theater)
      return <div>loading</div>;
    return <div>
      <TheaterComponent theater={this.props.theater} />
    </div>;
  }
}



@connect(
  null,
  { saveTheater }
)
class TheaterComponent extends React.Component {

  handleSubmit(value, files) {
    var formData = createFormData(value, files)
    this.props.saveTheater(value._id.$oid,formData)

  }

    render() {
      const {theater} = this.props
      return <div>
          <h2 className="">{theater.name}

            <LinkContainer to={`/theaters/v/${theater._id.$oid}/shows/n`}>
              <button className="btn btn-default pull-right">Add Show</button>
            </LinkContainer>

          </h2>

          <br/>
            <Tabs>
              <Tab title="Shows">
                <Shows/>
              </Tab>
                <Tab title="Info"><br/>
                  <TheaterForm theater={theater} onSubmit={this.handleSubmit.bind(this)}/>
                </Tab>


              </Tabs>

      </div>;
    }
}
