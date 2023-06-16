import { ApolloClient, ApolloLink, createHttpLink, from, InMemoryCache } from "@apollo/client/core";
import {getJwtObject} from "@bankda/jangbuda-common";
import { onError } from '@apollo/client/link/error';
import store from '@/store'
import { useRouter } from "vue-router";
const baseURL = import.meta.env.VITE_GRAPHQL_ENDPOINT;
const httpLink = createHttpLink({
  uri: baseURL,
});

let isTokenRefreshing = false; // Flag to indicate if the token is being refreshed
let refreshPromise: Promise<any> | null = null; // Hold the refresh token promise
const connections: { [key: string]: any } = {}; // Hold the controller for each connection

const authMiddleware = new ApolloLink((operation, forward) => {
  const accessToken = sessionStorage.getItem('token');
  // Check if the token is expired
  const isTokenExpired = accessToken &&  (getJwtObject(accessToken).isExpired(60000) || getJwtObject(accessToken).isExpired()) ? true : false;
  const link = window.location.href;
  const operationName = operation.operationName;
  console.group("%c Request api", 'color: green');
  console.log('%c url', 'color: blue;', link);
  console.log('%c name-gql', 'color: blue;', operationName);
  console.log('%c current accessToken', 'color: blue;', accessToken);
  console.log('%c refreshPromise', 'color: blue;', refreshPromise);
  console.groupEnd();

  // get api call
  if (isTokenExpired) {
    if (!isTokenRefreshing) {
      isTokenRefreshing = true;
      console.group("%c Token expired", 'color: red');
      console.log('%c old-accessToken', 'color: red;', accessToken);
      // get url browser
     
      let count = 0
      console.log('%c count', 'color: red;', count++);;
      console.groupEnd();
      // Token has expired, make a refresh login API request
      refreshPromise = refreshLogin().finally(() => {
        isTokenRefreshing = false;
        refreshPromise = null;
      });
    }

    return new Promise((resolve) => {
      refreshPromise!.then((value) => {
        console.log('%c newAccessToken', 'color: red;', value);
        // const newAccessToken = sessionStorage.getItem('token');
        operation.setContext({
          headers: {
            authorization: `Bearer ${value}`,
          },
        });
        resolve(forward(operation));
      });
    });
  }

  operation.setContext({
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  return forward(operation);
}).concat(
  onError(({ networkError, graphQLErrors }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
          // set open popup if has error
          store.commit('common/setApiErrorData', err)
          store.commit('common/setApiErrorStatus', true)
      }
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  })
);

export const client = new ApolloClient({
  link: from([authMiddleware, httpLink]),
  cache: new InMemoryCache(),
});

async function refreshLogin() {
  try {
    const router = useRouter()
    // Make the API request to refresh the token
    const response = await fetch(baseURL, {
      method: "POST",
      // Add any required parameters for the refresh login API
      body: JSON.stringify({
        query: `
          mutation refreshLogin($accessToken: String! , $refreshToken: String!) {
            refreshLogin(accessToken: $accessToken, refreshToken: $refreshToken) {
              accessToken
              refreshToken
            }
          }`,
        variables: {
          accessToken: sessionStorage.getItem("token"),
          refreshToken: sessionStorage.getItem("refreshToken"),
        }
      }),
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      throw new Error("Failed to refresh login");
    }

    // Extract the new access token from the response
    const data = await response.json();
    if(data.errors) {
      store.commit("auth/logout");
      router.push('/login');
      return
    }
    // Update the access token and expiration time in session storage
    sessionStorage.setItem("token", data.data.refreshLogin.accessToken);
    sessionStorage.setItem('refreshToken', data.data.refreshLogin.refreshToken);

    Object.values(connections).forEach((controller: AbortController) => {
      controller.abort(); // Cancel all pending requests
    });
    return data.data.refreshLogin.accessToken;
  } catch (error) {
    console.error("Failed to refresh login", error);
    return Promise.reject(error);
  }
}
