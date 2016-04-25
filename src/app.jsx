
import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/main.css'

import { Router, Route, hashHistory, IndexRoute, browserHistory } from 'react-router'
import { Link } from 'react-router'
import { Provider } from 'react-redux'
import { LinkContainer,IndexLinkContainer } from 'react-router-bootstrap';

import {store } from './store';

import { Navbar,Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';


import { Home } from './home'
import { UserPage, UserDetails } from './users'
import { ReposPage, RepoDetails } from './repos'
import { FormPage } from './form'


class App extends React.Component {
  render() {
    return (
      <div>
        <Titlebar/>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}



var routes =
<Route path="/" component={App}>
  <IndexRoute component={Home}/>
  <Route path="/users">
    <IndexRoute component={UserPage}/>
    <Route path="/users/:login" component={UserDetails}/>
  </Route>

    <Route path="/repos">
      <IndexRoute component={ReposPage}/>
      <Route path="/repos/:id" component={RepoDetails}/>
    </Route>
  <Route path="/form" component={FormPage}/>

</Route>
;

class Root extends React.Component {
  render() {
    const {  history, store } = this.props
    return (
      <Provider store={store}>
        <Router history={history}>
          {routes}
        </Router>
      </Provider>
    )
  }
}



const Titlebar = ()=> (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">React-Bootstrap</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <IndexLinkContainer to='/'>
          <NavItem eventKey={1}>Home</NavItem>
        </IndexLinkContainer>
        <LinkContainer to='/users'>
          <NavItem eventKey={2}>Users</NavItem>
        </LinkContainer>
        <LinkContainer to='/repos'>
          <NavItem eventKey={3}>Repos</NavItem>
        </LinkContainer>
        <LinkContainer to='/form'>
          <NavItem eventKey={4}>Rich Form</NavItem>
        </LinkContainer>


        <NavDropdown
          eventKey={3}
          title="Dropdown"
          id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>
            Another action
          </MenuItem>
          <MenuItem eventKey={3.3}>
            Something else here
          </MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.3}>
            Separated link
          </MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)



ReactDOM.render(
  <Root  history={hashHistory} store={store}/>,
  document.getElementById('app')
);
