import React from 'react';
import { Link } from 'react-router';

import request from 'superagent';

import { Input, ButtonGroup, Form} from './utils/forms';
import _ from 'lodash';

export class RepoDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data: {} };
  }

  componentDidMount(){
    request
      .get(`https://api.github.com/repos/wesbos/${this.props.params.id}`)
      .end( (err, res)=> {
        this.setState({data:res.body});
        //console.log(res.body);
    });
  }

  handleSubmit(value) {
    console.log('form submitted', value);
    this.context.router.push('/repos');
  }


  render() {
    return (
      <div>
      <h1 className="page-header"><small>Repo</small> {this.state.data.name}</h1>

          <Form value={this.state.data} no-validation
              onSubmit={this.handleSubmit.bind(this)}
              style={ { marginTop:'40px' }}>

              <Input name="name"/>
              <Input name="full_name"/>
              <Input name="homepage" type="url"/>
              <Input name="owner.login" type="url"/>

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

RepoDetails.contextTypes = {
    router: React.PropTypes.object.isRequired
};



class RepoListRow extends React.Component {
  render() {
    console.log(this.props.data);
    return (
      <tr>
      <td>
        <Link to={`/repos/${this.props.data.name}`}>{this.props.data.name}</Link></td>
        <td>{this.props.data.description}</td>
        <td>{this.props.data.stargazers_count}</td>
     </tr>
    );
  }
}



export class ReposList extends React.Component {

  constructor(props) {
   super(props);
   this.state = {
     data:[]
   }
  }

  componentDidMount(){
    request
      .get('https://api.github.com/users/wesbos/repos')
      .end( (err, res)=> {
        this.setState({ data: (this.props.limit) ? _.slice(res.body,0,this.props.limit) : res.body })

    });
  }

  render() {
    var nodes = this.state.data.map( e => <RepoListRow key={e.login} data={e}/> );
    return (
        <table className="table">
          <thead>
            <tr><th>Name</th><th>Description</th><th>Stars</th></tr>
          </thead>
          <tbody>
            {nodes}
          </tbody>
        </table>
    );
  }

}


export class ReposPage extends React.Component {
  render() {
    return <div>
    <h2 className="page-header">Repos</h2>
      <ReposList/>
    </div>;
  }
}
