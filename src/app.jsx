
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


import { Navbar,Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';

const Titlebar = ()=> (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">React-Bootstrap</a>
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



class Preview extends React.Component {
  render() {
    const {file, imageUrl} = this.props.file
    console.log('file',file)
    return (
      <div>
        {file.name}, type: {file.type}<br/>
        <img ref="img" src={imageUrl} />
      </div>
    )
  }

}




class Dropzone extends React.Component {

  constructor(props) {
   super(props);
   this.state = {
     file:null
   }
  }

  onDrop(e) {
    e.preventDefault();
    console.log(e.target.files);
    _.each(e.target.files, this._createPreview.bind(this));
  }


  _createPreview (file){
         var self = this , newFile, reader = new FileReader();

         reader.onloadend = (e) => {
           newFile = {file:file, imageUrl:e.target.result};
           console.log('file loaded', file)

           if (self.props.onDrop) {
             self.props.onDrop(newFile);
           }

           self.setState({file:newFile})

         };
         reader.readAsDataURL(file);
  }

  render() {

    var preview = this.state.file ? <Preview file={this.state.file}/> : <div/>

    return (
      <div>
        <input type='file' multiple ref='fileInput' onChange={this.onDrop.bind(this)} />
             {this.props.children}
<hr/>
{preview}

      </div>
    )
  }
}


const TestApp = ()=> (
  <div>
    <Titlebar/>
    <div className="container">
      <h1>file</h1>
      <Dropzone onDrop={  (f)=> console.log(f)    }/>


    </div>

  </div>
)


ReactDOM.render(
  <TestApp/>,
  document.getElementById('app')
);
