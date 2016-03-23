
import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';

import { Router, Route, hashHistory, IndexRoute, browserHistory } from 'react-router'
import { Link } from 'react-router'

import { Provider } from 'react-redux'


import { NavBar, NavLink } from './utils/navbar';
import { Tabs, Tab } from './utils/tabs';

import { Home } from './home';
import { About } from './about';
import { UserPage, UserDetails} from './users';
import { ReposPage, RepoDetails} from './repos';
import { Message} from './message';

import { TheatersPage } from './components/theaters'

import {store } from './store';



class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar brand="Theater App Management">
          <NavLink to="/" onlyActiveOnIndex={true}>Theaters</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/repos">Repos</NavLink>
        </NavBar>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}


class Root extends React.Component {
  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <Router history={history}>
           <Route path="/" component={App}>
              <IndexRoute component={TheatersPage}/>
              <Route path="/msg" component={Message}/>
              <Route path="/about" component={About}/>
              <Route path="/users" component={UserPage}/>
              <Route path="/users/:login" component={UserDetails}/>
            <Route path="/repos" component={ReposPage}/>
          <Route path="/repos/:id" component={RepoDetails}/>
           </Route>
         </Router>
      </Provider>
    )
  }
}



ReactDOM.render(
  <Root store={store} history={hashHistory} />,
  document.getElementById('app')
);
