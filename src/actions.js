'use strict';

import fetch from 'isomorphic-fetch'

export const sendMessage = (msg) => {
  return {
      type: 'SEND_MESSAGE',
      msg
  };
};


export const LOAD_USERS = 'LOAD_USERS';

export const loadUsers = () => {
  return (dispatch, getState) => {

    let {users} = getState()
    console.log(users);
    if (users && users.length>0) return

    dispatch({ type: LOAD_USERS, state: 'loading' });
    return fetch('https://api.github.com/users/wesbos/followers')
          .then(response => response.json())
          .then(json => dispatch({ type: LOAD_USERS, state: 'done', data: json }));
  };
};
