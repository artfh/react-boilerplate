
import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';

import { Router, Route, hashHistory, IndexRoute, browserHistory } from 'react-router'
import { Link } from 'react-router'

import { NavBar, NavLink } from './utils/navbar';
import { Tabs, Tab } from './utils/tabs';

import { Home } from './home';
import { About } from './about';
import { UserPage, UserDetails} from './users';
import { ReposPage, RepoDetails} from './repos';


class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar brand="react-boilerplate">
          <NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/repos">Repos</NavLink>
          <NavLink to="/about">About</NavLink>
        </NavBar>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
     <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/users" component={UserPage}/>
        <Route path="/users/:login" component={UserDetails}/>
      <Route path="/repos" component={ReposPage}/>
    <Route path="/repos/:id" component={RepoDetails}/>

     </Route>
   </Router>
,
  document.getElementById('app')
);
