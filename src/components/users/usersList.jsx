import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import getAllUsers from 'queries/getAllUsers.gql';

const UsersList = ({ data }) => (
  <div>
    <div>Meetupers</div>
    {data && data.allUsers
      ? data.allUsers.map(user => (
        <div key={user.id}>
            User: {user.name}
            Id: {user.id}
        </div>
        ))
      : 'Loading...'}
  </div>
);

UsersList.propTypes = {};

export default graphql(getAllUsers)(UsersList);
