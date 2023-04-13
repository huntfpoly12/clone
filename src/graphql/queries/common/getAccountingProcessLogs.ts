import gql from "graphql-tag";
export default gql`
  query getAccountingProcessLogs(
    $companyId: Int!
    $fiscalYear: Int!
    $facilityBusinessId: Int!
    $year: Int!
    $month: Int!
  ) {
    getAccountingProcessLogs(
      companyId: $companyId
      fiscalYear: $fiscalYear
      facilityBusinessId: $facilityBusinessId
      year: $year
      month: $month
    ) {
      ts
      loggedAt
      remark
      createdAt
      createdBy
      updatedAt
      updatedBy
      active
      ip
    }
  }
`;
