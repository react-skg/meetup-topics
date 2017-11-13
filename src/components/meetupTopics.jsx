import React from 'react';
import PostsList from 'components/postsList/postsList';
import Auth from 'components/auth';

import './meetupTopics.scss';

const MeetupTopics = props => (
  <Auth
    auth={props.auth}
    render={({ isLoggedIn }) =>
      (isLoggedIn ? (
        <div>
          <PostsList />
        </div>
      ) : (
        <div>Log In Bitches</div>
      ))}
  />
);

export default MeetupTopics;
