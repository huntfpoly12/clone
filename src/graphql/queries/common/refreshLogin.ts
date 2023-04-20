import gql from "graphql-tag";
export default gql`
  query refreshLogin($accessToken: String! , $refreshToken: String!) {
    refreshLogin(accessToken: $accessToken, refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;
