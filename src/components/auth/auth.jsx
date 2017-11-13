import React, { Component } from 'react';
import withCreateUser from './withCreateUser';
import withUser from '../withUser';

class Auth extends Component {
  constructor(props) {
    super(props);
    const { isLoggedIn } = this.props.auth;

    this.state = {
      isLoggedIn
    };

    this.updateIsLoggedIn = this.updateIsLoggedIn.bind(this);

    if (!isLoggedIn) {
      const { updateIsLoggedIn } = this;

      this.props.auth.authenticate((profile) => {
        updateIsLoggedIn(profile);
      });
    }
  }

  updateIsLoggedIn(profile) {
    const { auth, createUser } = this.props;
    console.log('props', this.props);
    if (!this.props.auth0UserId) {
      createUser({
        idToken: auth.auth0IdToken,
        name: auth.profile.name,
        imgUrl: auth.profile.picture
      });
    }

    this.setState({
      isLoggedIn: !!profile
    });
  }

  render() {
    const { isLoggedIn } = this.state;
    return this.props.render
      ? this.props.render({ isLoggedIn })
      : this.props.children({ isLoggedIn });
  }
}

export default withUser(withCreateUser(Auth));
