import React from 'react';
import { Link } from 'react-router';

import { Tabs, Tab } from './utils/tabs';

import { UserList } from './users';
import { ReposList } from './repos';


export class Home extends React.Component {
  render() {
    return (
      <div>

      <div className="jumbotron">
       <h1>react-boilerplate</h1>
       <p>
       Quick setup for new React.js applications using webpack, Bootstrap and react-router.

       </p>
      </div>

      <Tabs>
      <Tab title="Users and Repos">
      <div className="row">
        <div className="col-md-6 col-xs-6">
        <h3>Users</h3>
      <UserList limit={5}/></div>
    <div className="col-md-6 col-xs-6"><h3>Repos</h3><ReposList limit={5}/></div>
      </div>

      </Tab>
        <Tab title="Users">
          <UserList limit={10}/>
        </Tab>
        <Tab title="Repos">
        <ReposList limit={10}/>  </Tab>
        <Tab title="Tab 3">
        <h3>Tab 3</h3>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Tab>
      </Tabs>

         </div>
    );
  }
}
