import React from 'react';
import { Link } from 'react-router';

import _ from 'lodash';
import fetch from 'isomorphic-fetch'

import { Input, ButtonGroup, Form} from './forms/forms';

import { connect } from 'react-redux'
import { loadUsers } from './actions'

export class UserDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data: {} };
  }

  componentDidMount(){
    fetch(`https://api.github.com/users/${this.props.params.login}`)
      .then(response => response.json())
      .then(json => {
        this.setState({data:json});
        //console.log(json);
      });
  }

  handleSubmit(value) {
    console.log('form submitted', value);
    this.context.router.push('/users');
  }


  render() {
    return (
      <div>
      <h1 className="page-header"><small>User</small> {this.state.data.name}</h1>

          <Form value={this.state.data} no-validation
              onSubmit={this.handleSubmit.bind(this)}
              style={ { marginTop:'40px' }}>

              <Input name='login' required pattern=".*" title="sss sss"/>
              <Input name="name"/>
              <Input name="email" type="email"/>
              <Input name="location"/>
              <Input name="blog" type="url"/>
              <Input name="public_repos" type="number" min="0" max="1000"/>
              <Input name="created_at" type="datetime" />
              <Input name="company"/>

              <ButtonGroup>
                  <button  className="btn btn-success"
                    style={{marginRight:'5px'}}>Save</button>
                  <button className="btn btn-default">Reset</button>
              </ButtonGroup>

          </Form>
    </div>

    );
  }
}

UserDetails.contextTypes = {
    router: React.PropTypes.object.isRequired
};



class UserListRow extends React.Component {
  render() {
    //console.log(this.props.data);
    return (
      <tr>
      <td>
      <img src={this.props.data.avatar_url}  style={{width: '40px', height: '40px'}} className="img-circle"/>
    &nbsp;&nbsp;
        <Link to={`/users/${this.props.data.login}`}>{this.props.data.login}</Link></td>
        <td scope="row">{this.props.data.id}</td>
     </tr>
    );
  }
}



export class UserList extends React.Component {

  componentDidMount(){
    this.props.onMount()
  }

  render() {
    var nodes = this.props.limit ? _.slice(this.props.data,0,this.props.limit) : this.props.data
    nodes = nodes.map( e => <UserListRow key={e.login} data={e}/> );
    return (
        <table className="table">
          <thead>
            <tr><th>Name</th><th>ID</th></tr>
          </thead>
          <tbody>
            {nodes}
          </tbody>
        </table>
    );
  }

}


UserList = connect(
  (state, ownProps) => ({data: state.users}),
  (dispatch, ownProps) => ({
      onMount: () => dispatch(loadUsers())
  })
)(UserList)

export { UserList }


export const UserPage = (props) =>  {
    return <div>
    <h2 className="page-header">Users with Redux</h2>
    <UserList/>
    </div>;
}
