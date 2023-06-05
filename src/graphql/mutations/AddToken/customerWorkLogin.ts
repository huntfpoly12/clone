import gql from "graphql-tag";
export default gql`
  mutation customerWorkLogin($companyId: Int!) {
    customerWorkLogin(companyId: $companyId) {
      accessToken
      refreshToken
    }
  }
`;
