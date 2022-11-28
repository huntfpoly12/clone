import gql from "graphql-tag";
export default gql`
  query getDepartments($companyId: Int!) {
    getDepartments(companyId: $companyId) {
      department
    }
  }
`;
