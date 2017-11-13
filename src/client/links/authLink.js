/* global localStorage */
import { ApolloLink } from 'apollo-link';

const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${localStorage.getItem('auth0IdToken') || null}`
    }
  });
  return forward(operation);
});

export default middlewareLink;
