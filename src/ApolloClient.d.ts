import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client/core";
import { setContext } from "apollo-link-context";

const baseURL = import.meta.env.VITE_GRAPHQL_ENDPOINT;
const httpLink = createHttpLink({
  uri: baseURL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from localstorage if it exists
  const token = sessionStorage.getItem("token");

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
