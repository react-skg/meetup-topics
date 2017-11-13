import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import AuthLink from './links/authLink';

const createApolloClient = (uri) => {
  const httpLink = new HttpLink({
    uri
  });

  return new ApolloClient({
    link: AuthLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true
  });
};

export default createApolloClient;
