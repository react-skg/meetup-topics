/* global localStorage */
import Auth0Lock from 'auth0-lock';

// @TODO: Get these values from env config and pass them to the
// auth constructor
const CLIENT_ID = 'J6JseG2B3T7u6tQ1y8F1fM40XLvJ8ksv';
const DOMAIN = 'sgkreact.eu.auth0.com';

/**
 * Wrapper service on the Auth0Lock package
 * to authenticate with Auth0
 */
class Authorisation {
  constructor() {
    this.lock = new Auth0Lock(CLIENT_ID, DOMAIN, {
      auth: {
        responseType: 'id_token',
        params: { scope: 'openid email' },
        redirect: false,
        sso: true
      },
      autoclose: true,
      theme: {
        logo: 'https://github.com/react-skg/files/blob/master/avatar-small.png?raw=true',
        primaryColor: '#433C80'
      }
    });

    this.lock.on('authenticated', this.doAuthentication.bind(this));
    this.lock.on('authorization_error', console.log);
    // this.lock.
  }

  /**
   * Display the Auth0Lock window for authentication
   */
  authenticate(callback) {
    this.lock.show();
    this.lock.on('authenticated', authResult => this.doAuthentication(authResult, callback));
  }

  /**
   * Get the auth0 result and set the profile of the user
   * @param {Object} authResult
   */
  doAuthentication(authResult, callback = () => {}) {
    if (!this.profile) {
      this.auth0IdToken = authResult.idToken;
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          this.auth0IdToken = null;
          this.profile = null;
          callback(profile);
        } else {
          this.profile = profile;
          callback(profile);
        }
      });
    }
  }

  /**
   * Returns the auth0IdToken
   */
  get auth0IdToken() {
    return localStorage.getItem('auth0IdToken');
  }

  /**
   * Sets the auth0IdToken
   * @param {String} value The auth0IdToken to set
   */
  set auth0IdToken(value) {
    if (value) {
      localStorage.setItem('auth0IdToken', value);
    } else {
      localStorage.removeItem('auth0IdToken');
    }
  }

  get profile() {
    return JSON.parse(localStorage.getItem('profile'));
  }

  set profile(value) {
    if (value) {
      localStorage.setItem('profile', JSON.stringify(value));
    } else {
      localStorage.removeItem('profile');
    }
    // callback
  }

  get isLoggedIn() {
    return !!this.profile;
  }
}

export default Authorisation;
