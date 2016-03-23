import React from 'react';
import { Link } from 'react-router';

import fetch from 'isomorphic-fetch';
import {ContentPage} from '../utils/page';



const TheaterListRow = ({data}) => (
    <tr>
        <td><Link to={`/repos/${data.name}`}>{data.name}</Link></td>
        <td>{data.description}</td>
        <td>{data.stargazers_count}</td>
    </tr>
)



class TheaterList extends React.Component {

  constructor(props) {
   super(props);
   this.state = {
     data:[]
   }
  }

  componentDidMount(){
    fetch('https://api.github.com/users/wesbos/repos')
      .then(response => response.json())
      .then(json => {
          this.setState({ data: (this.props.limit) ? _.slice(json,0,this.props.limit) : json })
      });
  }

  render() {
    var nodes = this.state.data.map( e => <TheaterListRow key={e.name} data={e}/> );
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


export const TheatersPage = () =>  (
  <div>
    <h2 className="page-header">
      Theaters
      <button className="btn btn-default pull-right">New</button>
      <div className="clearfix"></div>
     </h2>
     <TheaterList/>
  </div>
)
