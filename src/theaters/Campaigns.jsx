import React from 'react';
import { Link } from 'react-router';
import { LinkContainer,IndexLinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { Modal ,Button} from 'react-bootstrap';


import { removeShow} from './actions2'

import {  Image } from '../forms/image'


@connect(
  state=> ({ campaigns: state.campaigns, shows: state.shows,  theater:state.theater }),
  {removeShow}
)
export default class Campaigns extends React.Component {

  state = { confirmDelete : null }

  componentDidMount() {

  }

  showDeleteConfirm(t) {
    this.setState({confirmDelete:t})
  }

  hideConfirmModal() {
    this.setState({confirmDelete:null})
  }

  removeItem(){
    const item = this.state.confirmDelete
    this.hideConfirmModal()
    this.props.removeShow(this.props.theater._id.$oid,item)
  }

  renderConfirmDelete() {

    if (!this.state.confirmDelete)
    return null

    return (<Modal
      show={true}
      onHide={ ()=> this.hideConfirmModal() }>
      <Modal.Header closeButton>
        <Modal.Title>
          Confirm Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete the selected item?
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=> this.removeItem() }>Delete</Button>
        <Button onClick={()=> this.hideConfirmModal()}>Cancel</Button>

      </Modal.Footer>
    </Modal>)
  }

  render() {
    const {campaigns} = this.props
    console.log("Campaigns.render");
    const modal = this.renderConfirmDelete()

    campaigns.map( c => console.log(c))

    return <div>
      {modal}
      <table className="table">
        <thead>
          <tr><th>Name</th></tr>
        </thead>
        <tbody>
          {campaigns.map( t=>
            <tr key={t._id.$oid}>
              <td>
                  {t._id.$oid}


                  <CampaignItem campaign={t}/>




              </td>
              <td style={{ verticalAlign:'middle' }}>
                <button className="btn btn-default pull-right" onClick={ this.showDeleteConfirm.bind(this, t) }>Remove</button>

                  <LinkContainer to={`/theaters/v/${this.props.theater._id.$oid}/shows/e/${t._id.$oid}`}>
                    <button className="btn btn-default pull-right">Edit</button>
                  </LinkContainer>
            </td>

            </tr>
          )}
        </tbody>
      </table>
    </div>;
  }
}


@connect(
  (state, ownProps)=> {
    const showId = ownProps.campaign.show.$oid
    return {
      theater: state.theater,
      show: _.first(state.shows.filter( e=> showId === e._id.$oid ))
    }
  }
)
class CampaignItem extends React.Component {

  render() {
    var { theater, show, campaign } = this.props



    return   <div className="media">


      <div className="media-left">
        <LinkContainer to={`/theaters/v/${theater._id.$oid}/campaigns/v/${campaign._id.$oid}`}>
        <a href="#">
            <Image imageId={show.portrait_image} className="media-object"/>
        </a>
        </LinkContainer>
      </div>




        <div className="media-body media-middle">
          <h4 className="media-heading">
            <LinkContainer to={`/theaters/v/${this.props.theater._id.$oid}/campaigns/v/${campaign._id.$oid}`}>
            <a href="#">
              {show.title}
            </a>
            </LinkContainer>
          </h4>
          {show.subtitle}<br/>

        <div style={{marginTop:10}}>
          <DateString value={show.start_date}/> - <DateString value={show.end_date}/>
        </div>

        </div>

      </div>

  }

}




export class DateString extends React.Component {

  render() {
    var { format, value } = this.props
    if (!value) return null
    var v = moment(value['$date']).format('DD.MM.YYYY')
    return <span>{v}</span>
  }

}
