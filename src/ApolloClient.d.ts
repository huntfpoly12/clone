import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client/core";
import mutations from "@/graphql/mutations/index";
import { setContext } from  '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import store from '@/store'
const baseURL = import.meta.env.VITE_GRAPHQL_ENDPOINT;
const httpLink = createHttpLink({
  uri: baseURL,
});

// get the new token from your server
const accessToken = sessionStorage.getItem('token');
const refreshToken = sessionStorage.getItem('refreshToken');

const authLink = setContext(async (_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : null,
    },
  };
});


const refreshLink = onError(({ networkError, graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions?.code) {
        case 'UNAUTHENTICATED':
          console.log(err.extensions?.code);
          // call the mutation to refresh token
          return client.mutate({
            mutation: mutations.refreshLogin,
            variables: { 
              accessToken : accessToken,
              refreshToken:refreshToken 
            },
          })
            .then(({ data }) => {
              // save the new tokens
              sessionStorage.setItem('token', data.refreshLogin.accessToken);
              sessionStorage.setItem('refreshToken', data.refreshLogin.refreshToken);
              // update the headers with the new token
              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${data.refreshLogin.accessToken}`,
                },
              });
              // retry the request, returning the new observable
              return forward(operation);
            })
            .catch((error) => {
              // handle error
              console.log(error);
            });
      }
    }
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});
export const client = new ApolloClient({
  link: refreshLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});
