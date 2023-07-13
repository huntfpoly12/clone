import axios from "axios";
import {client} from "./ApolloClient.d";
import mutations from "@/graphql/mutations/index";
const baseURL = import.meta.env.VITE_GRAPHQL_ENDPOINT;
async function getRefreshTokenCustom(accessToken: string) {
  const response = await fetch(baseURL, {
    method: "POST",
    // Add any required parameters for the refresh login API
    body: JSON.stringify({
      query: `
          mutation customerWorkLogin($companyId: Int!) {
            customerWorkLogin(companyId: $companyId) {
              accessToken
              refreshToken
            }
          }`,
      variables: {
        companyId: +sessionStorage.getItem("companyId"),
      }
    }),
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + accessToken,
    }
  });

  if (!response.ok) {
    throw new Error("Failed to refresh login");
  }
  // Extract the new access token from the response
  const data = await response.json();
  if (data.errors) return null
  // Update the access token and expiration time in session storage
  sessionStorage.setItem("token", data.data.customerWorkLogin.accessToken);
  sessionStorage.setItem('refreshToken', data.data.customerWorkLogin.refreshToken);
  return data.data.customerWorkLogin.accessToken;
}


const instance = axios.create({
  baseURL: import.meta.env.VITE_RESTAPI_ENDPOINT,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: sessionStorage.getItem("token")
      ? `Bearer ${sessionStorage.getItem("token")}`
      : null,
  },
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const typeLogin = sessionStorage.getItem('typeLogin');
      let newAccessToken;
      try {
        if (typeLogin === 'custom') {
          newAccessToken = getRefreshTokenCustom(sessionStorage.getItem("token"));
        } else {
          const { data } = await client.mutate({
            mutation: mutations.refreshLogin,
            variables: {
              accessToken: sessionStorage.getItem("token"),
              refreshToken: sessionStorage.getItem("refreshToken"),
            },
          });
          newAccessToken = data.refreshLogin.accessToken;
          sessionStorage.setItem("token", newAccessToken);
          sessionStorage.setItem('refreshToken', data.refreshLogin.refreshToken);
        }
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (err) {
        console.warn(err);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
