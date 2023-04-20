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
      accountingDocumentId
      resolutionNumber
      bankbook {
        bankbookNickname
        type
        bankbookNumber
      }
      transactionDetailDate
      resolutionClassification
      income
      spending
      summaryOfBankbookDetail
      summary
      accountCode
      relationCode
      fundingSource
      clientId
    }
  }
`;
