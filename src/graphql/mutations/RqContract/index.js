import gql from "graphql-tag";

const mutations = {
  customerWorkLogin: gql`
    mutation customerWorkLogin(
      $companyId: Int!
    ) {
      customerWorkLogin(
        companyId: $companyId
      ) {
        accessToken
        refreshToken
      }
    }
  `,
};

export default mutations;
