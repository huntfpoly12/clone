import axios from "axios";
import { client } from "./ApolloClient.d";
import mutations from "@/graphql/mutations/index";
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
      try {
        const { data } = await client.mutate({
          mutation: mutations.refreshLogin,
          variables: {
            accessToken: sessionStorage.getItem("token"),
            refreshToken: sessionStorage.getItem("refreshToken"),
          },
        });
        const newAccessToken = data.refreshLogin.accessToken;
        sessionStorage.setItem("token", newAccessToken);
        sessionStorage.setItem('refreshToken', data.refreshLogin.refreshToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (err) {
        console.warn( err);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
