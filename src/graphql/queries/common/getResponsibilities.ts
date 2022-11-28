import gql from "graphql-tag";
export default gql`
  query getResponsibilities($companyId: Int!) {
    getResponsibilities(companyId: $companyId) {
      responsibility
    }
  }
`;
