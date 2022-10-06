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
};

export default mutations;
