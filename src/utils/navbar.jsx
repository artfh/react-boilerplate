import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';


let createLocationDescriptor = (to, { query, hash, state }) => {
  if (query || hash || state) {
    return { pathname: to, query, hash, state }
  }
  return to
}


export class NavLink extends React.Component {

  render() {
    let { to, query, hash, state } = this.props;
    let location = createLocationDescriptor(to, { query, hash, state });

    let isActive = this.context.router.isActive(location, this.props.onlyActiveOnIndex);
    let className = isActive ? 'active' : '';

    return  <li className={className}>
      <Link {...this.props} activeClassName="active" onlyActiveOnIndex={this.props.onlyActiveOnIndex}/>
    </li>;
  }
}

NavLink.contextTypes = {
    router: React.PropTypes.object.isRequired
};


export class NavBar extends React.Component {
  render() {
    return  (
      <nav className="navbar navbar-default">

      <div className="container">
        <div className="navbar-header">
        <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
        </button>
        <a className="navbar-brand" href="#">{this.props.brand}</a>
      </div>

      <div id="navbar" className="navbar-collapse collapse">
               <ul className="nav navbar-nav">
                    {this.props.children}
                </ul>
              </div>


      </div>
      </nav>
    );}
  }
