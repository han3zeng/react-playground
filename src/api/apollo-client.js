import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import config from '../config';

const { resourceServerOrigin } = config;

const httpLink = createHttpLink({
  uri: `${resourceServerOrigin}/graphql`,
  credentials: 'include',
});

const authLink = setContext(() => fetch(`${resourceServerOrigin}/initialization`, {
  method: 'GET',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
}).then(async (response) => {
  const data = await response.json();
  const { csrfToken } = data;
  return {
    headers: {
      'Content-Type': 'application/json',
      'CSRF-Token': csrfToken,
    },
  };
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
