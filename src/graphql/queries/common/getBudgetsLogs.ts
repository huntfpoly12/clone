import gql from "graphql-tag";
export default gql`
  query getBudgetsLogs(
    $companyId: Int!
    $fiscalYear: Int!
    $facilityBusinessId: Int!
  ) {
    getBudgetsLogs(
      companyId: $companyId
      fiscalYear: $fiscalYear
      facilityBusinessId: $facilityBusinessId
    ) {
      createdAt
      createdBy
      updatedAt
      updatedBy
      ip
      active
      loggedAt
      remark
    }
  }
`;
