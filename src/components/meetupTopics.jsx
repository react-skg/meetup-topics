import React from 'react';
import PostsList from 'components/postsList/postsList';
import Auth from 'components/auth';
import Logo from 'components/logo';

import { Button, Header } from 'semantic-ui-react';

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
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              width: '100%',
              height: '100vh',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          >
            <Header icon="hand spock" content="Welcome SKG-R.eactors" color="violet" />
            <Logo />
            <Button
              content="Login / Signup"
              color="violet"
              circular
              inverted
              onClick={() => props.auth.authenticate()}
            />
          </div>
        </div>
      ))}
  />
);

export default MeetupTopics;
