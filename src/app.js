/* global window */
import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import Authorisation from 'services/authorisation';
import createApolloClient from 'client';
import MeetupTopics from 'components';

import '../semantic/dist/semantic.css';
// @TODO Get the uri from the environment
const uri = 'https://api.graph.cool/simple/v1/cj9ld3aky0rlu0112332rq9q3';

const auth = new Authorisation();

const MeetupTopicsWrapper = () => (
  <ApolloProvider client={createApolloClient(uri)}>
    <Router>
      <div>
        <Route exact path="/" component={() => <MeetupTopics auth={auth} />} />
      </div>
    </Router>
  </ApolloProvider>
);

const isRequired = (errorMessage = 'Missing Required Field') => {
  throw new TypeError(errorMessage);
};

/**
 * Initialize the application
 * @param {Window} window
 * @param {String} rootElementId
 */
const init = (
  window = isRequired('Window is required'),
  rootElementId = isRequired('rootElementId is required')
) => {
  window.addEventListener('load', () => {
    render(<MeetupTopicsWrapper />, window.document.getElementById(rootElementId));
  });
};

init(window, 'app');

export { init };
export default MeetupTopics;
