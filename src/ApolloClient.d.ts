import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client/core";
import mutations from "@/graphql/mutations/index";
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import store from '@/store'
import { Observable } from 'rxjs';
const baseURL = import.meta.env.VITE_GRAPHQL_ENDPOINT;
const httpLink = createHttpLink({
  uri: baseURL,
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from localstorage if it exists
  const accessToken = sessionStorage.getItem('token');
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
      if (err.message == "인증토큰이 만료되었습니다.") {
        switch (err.extensions?.code) {
          case 'UNAUTHENTICATED':
            // get the new token from your server
            const accessToken = sessionStorage.getItem('token');
            const refreshToken = sessionStorage.getItem('refreshToken');

            // call the mutation to refresh token
            return new Observable((observer) => {
              client.mutate({
                mutation: mutations.refreshLogin,
                variables: {
                  accessToken: accessToken,
                  refreshToken: refreshToken
                },
              })
                .then(({ data }) => {
                  console.log(data)
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
                  const subscriber = {
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer),
                  };
                  return forward(operation).subscribe(subscriber);
                })
                .catch((error) => {
                  // handle error
                  console.log(error);
                });
            });
        }
      } else {
        // set open popup if has error
        store.commit('common/setApiErrorData', err)
        store.commit('common/setApiErrorStatus', true)
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
