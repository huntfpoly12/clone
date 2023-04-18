import gql from "graphql-tag";
export default gql`
  query getAccountingDocuments(
    $companyId: Int!
    $fiscalYear: Int!
    $facilityBusinessId: Int!
    $year: Int!
    $month: Int!
  ) {
    getAccountingDocuments(
      companyId: $companyId
      fiscalYear: $fiscalYear
      facilityBusinessId: $facilityBusinessId
      year: $year
      month: $month
    ) {
      lastBalance
      accountingDocuments {
        transactionDetailDate
        documentOrderByDate
        resolutionNumber
        accountingDocumentId
        bankbookId
        bankbookDetailId
        bankbook {
          bankbookNickname
          type
          bankbookNumber
        }
        resolutionClassification
        income
        spending
        summaryOfBankbookDetail
        summary
        accountCode
        relationCode
        fundingSource
        clientId
        proofCount
        goodsCount
        handwriting
        resolutionNormalStatus
      }
    }
  }
`;
