import gql from "graphql-tag";
export default gql`
  query getAccountingDocumentsLogs(
    $companyId: Int!
    $fiscalYear: Int!
    $facilityBusinessId: Int!
    $year: Int!
    $month: Int!
  ) {
    getAccountingDocumentsLogs(
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
