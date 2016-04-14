
import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/main.css'

import { Router, Route, hashHistory, IndexRoute, browserHistory } from 'react-router'
import { Link } from 'react-router'

import { Provider } from 'react-redux'

import {store } from './store';

import { Navbar,Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';

import _ from 'lodash';
import { CropTest } from './crop'
import { DropTest, TestForm } from './drop'



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
   <IndexRoute component={DropTest}/>
   <Route path="/crop" component={CropTest}/>
   <Route path="/drop" component={DropTest}/>

</Route>;

class Root extends React.Component {
  render() {
    const {  history } = this.props
    return (

        <Router history={history}>
          {routes}
         </Router>
        )
  }
}



const Titlebar = ()=> (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">React-Bootstrap1</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} href="#">Link</NavItem>
      <NavItem eventKey={2} href="#">Link</NavItem>
      <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Action</MenuItem>
        <MenuItem eventKey={3.2}>Another action</MenuItem>
        <MenuItem eventKey={3.3}>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.3}>Separated link</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar>
)



ReactDOM.render(
   <Root  history={hashHistory} />,
  document.getElementById('app')
);
