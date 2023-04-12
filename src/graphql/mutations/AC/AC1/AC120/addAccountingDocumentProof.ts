import gql from "graphql-tag";
export default gql`
  mutation addAccountingDocumentProof(
    $companyId: Int!
    $fiscalYear: Int!
    $facilityBusinessId: Int!
    $transactionDetailDate: Int!
    $accountingDocumentId: Float!
    $fileStorageId: Int!
  ) {
    addAccountingDocumentProof(
      companyId: $companyId
      fiscalYear: $fiscalYear
      facilityBusinessId: $facilityBusinessId
      transactionDetailDate: $transactionDetailDate
      accountingDocumentId: $accountingDocumentId
      fileStorageId: $fileStorageId
    ) {
        name
    }
  }
`;
