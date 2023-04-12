import gql from "graphql-tag";
export default gql`
  query searchSpendingAccountingDocuments(
    $companyId: Int!
    $fiscalYear: Int!
    $facilityBusinessId: Int!
    $year: Int!
    $month: Int!
    $resolutionNumber: String
  ) {
    searchSpendingAccountingDocuments(
      companyId: $companyId
      fiscalYear: $fiscalYear
      facilityBusinessId: $facilityBusinessId
      year: $year
      month: $month
      resolutionNumber: $resolutionNumber
    ) {
        bankbookId
    }
  }
`;