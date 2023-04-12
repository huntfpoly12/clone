import gql from "graphql-tag";
export default gql`
  query getAccountingDocumentProofs(
    $companyId: Int!
    $fiscalYear: Int!
    $facilityBusinessId: Int!
    $transactionDetailDate: Int!
    $accountingDocumentId: Float!
  ) {
    getAccountingDocumentProofs(
      companyId: $companyId
      fiscalYear: $fiscalYear
      facilityBusinessId: $facilityBusinessId
      transactionDetailDate: $transactionDetailDate
      accountingDocumentId: $accountingDocumentId
    ) {
        name
        url
        turl
        createdAt
        createdBy
        updatedAt
        updatedBy
        ip
        active
    }
  }
`;
