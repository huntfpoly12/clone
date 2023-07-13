import gql from "graphql-tag";

const mutations = {
  SIGN_IN: gql`
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        accessToken
        refreshToken
      }
    }
  `,
  ResetPassword: gql`
    mutation resetPassword($key: String!, $password: String!) {
      resetPassword(key: $key, password: $password)
    }
  `,
  ChangePassword: gql`
    mutation changeMyPassword($password: String!) {
      changeMyPassword(password: $password)
    }
  `,
  refreshLogin: gql`
    mutation refreshLogin($accessToken: String! , $refreshToken: String!) {
      refreshLogin(accessToken: $accessToken, refreshToken: $refreshToken) {
        accessToken
        refreshToken
      }
    }
  `,
  customerWorkLogin: gql`
    mutation customerWorkLogin($companyId: Int!) {
      customerWorkLogin(companyId: $companyId) {
        accessToken
        refreshToken
      }
    }
  `
};

export default mutations;
