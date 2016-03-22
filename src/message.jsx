import React from 'react';

import { connect } from 'react-redux'

import { sendMessage, loadUsers } from './actions'

class MessageComponent extends React.Component {

  componentDidMount(){
    this.props.onMount();
  }

  render() {
    console.log("1",this.props);
    return (
      <div onClick={ e => {
            this.props.onClick();
        } }>
        Message! {this.props.msg}
        <hr/>
      {  this.props.data ? this.props.data.map( e => e.login+", " ) : '???' }
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    msg: state.msg,
    data: state.users
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(loadUsers())
    },

    onMount: () => {
      dispatch(loadUsers())
    }

  }
}

export const Message = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageComponent)
