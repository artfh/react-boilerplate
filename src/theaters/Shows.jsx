import React from 'react';
import { Link } from 'react-router';
import { LinkContainer,IndexLinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { Modal ,Button} from 'react-bootstrap';

import moment from 'moment'
import later from 'later'

import {createFormData} from '../forms'
import { removeShow} from './actions2'
import ShowForm from './ShowForm'

import {  Image } from '../forms/image'



@connect(
  state=> ({ shows: state.shows, theater:state.theater }),
  {removeShow}
)
export default class Shows extends React.Component {

  state = { confirmDelete : null }

  componentDidMount() {
    //  this.props.loadTheaters()

    var cron = '00 18 * * 1,2 *'
    var s = later.parse.cron(cron);

    var a = later.schedule(s).next(10);
    console.log('--------',a);
    a.forEach( m => console.log(m))


  }

  showDeleteConfirm(t) {
    console.log("revome",t);
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
    const {shows} = this.props

    const modal = this.renderConfirmDelete()


    return <div>
      {modal}
      <table className="table">
        <thead>
          <tr><th>Name</th></tr>
        </thead>
        <tbody>
          {shows.map( t=>
            <tr key={t._id.$oid}>
              <td>

                <div className="media">
                  <div className="media-left">
                    <LinkContainer to={`/theaters/v/${this.props.theater._id.$oid}/shows/v/${t._id.$oid}`}>
                    <a href="#">
                        <Image imageId={t.portrait_image} className="media-object"/>
                    </a>
                    </LinkContainer>
                  </div>
                  <div className="media-body media-middle">
                    <h4 className="media-heading">
                      <LinkContainer to={`/theaters/v/${this.props.theater._id.$oid}/shows/v/${t._id.$oid}`}>
                      <a href="#">
                        {t.title}
                      </a>
                      </LinkContainer>
                    </h4>
                    {t.subtitle}<br/>

                  <div style={{marginTop:10}}>
                    <DateString value={t.start_date}/> - <DateString value={t.end_date}/>
                  </div>

                  </div>
                </div>






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



export class DateString extends React.Component {

  render() {
    var { format, value } = this.props
    if (!value) return null
    var v = moment(value['$date']).format('DD.MM.YYYY')
    return <span>{v}</span>
  }

}
