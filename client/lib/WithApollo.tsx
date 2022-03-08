import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      ...(token && { authorization: token ? `${token}` : '' }),
    },
  };
});

const uri = process.env.NEXT_PUBLIC_API_URL;
// const uri = 'http://44.201.180.113:4000';

const client = new ApolloClient({
  link: authLink.concat(
    new HttpLink({
      uri,
    }),
  ),
  cache: new InMemoryCache(),
});

export default client;
