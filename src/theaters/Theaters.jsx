import React from 'react';
import { Link } from 'react-router';
import { LinkContainer,IndexLinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { Modal ,Button} from 'react-bootstrap';

import {loadTheaters, removeTheater } from './actions2'


@connect(
  state=> ({ theaters: state.theaters }),
  { loadTheaters, removeTheater }
)
export default class Theaters extends React.Component {

  state = { confirmDelete : null }

  componentDidMount() {
    this.props.loadTheaters()
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
    this.props.removeTheater(item)
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
    const {theaters} = this.props
    const modal = this.renderConfirmDelete()

    return <div>
      <h2 className="page-header">Theaters
        <LinkContainer to={`/theaters/n`}>
          <button className="btn btn-default pull-right">Add Theater</button>
        </LinkContainer>

      </h2>

      { modal }

        <table className="table">
          <thead>
            <tr><th>Name</th><th></th></tr>
          </thead>
          <tbody>
            {theaters.map( t=>
              <tr key={t._id.$oid}>
                <td>
                  <LinkContainer to={`/theaters/v/${t._id.$oid}`}>
                      <a>{t.name} ({t._id.$oid})</a>
                  </LinkContainer>
                </td>
                <td>
                  <button className="btn btn-default pull-right" onClick={ this.showDeleteConfirm.bind(this, t) }>Remove</button>

                </td>

              </tr>
            )}
          </tbody>
        </table>
    </div>;
  }
}
