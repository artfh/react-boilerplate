import React from 'react';

import { connect } from 'react-redux'

import { sendMessage } from './actions'

class MessageComponent extends React.Component {

  render() {
    console.log("1",this.props);
    return (
      <div onClick={ e => {
            this.props.onClick();
            console.log('!!!!!!!!!!');
        } }>
        Message! {this.props.msg}
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  console.log('state ', state);
  return {
    msg: state.msg
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(sendMessage('AAAAA'))
    }
  }
}

export const Message = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageComponent)
