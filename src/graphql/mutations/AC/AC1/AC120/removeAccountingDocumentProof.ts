import gql from "graphql-tag";
export default gql`
  mutation removeAccountingDocumentProof(
    $companyId: Int!
    $fiscalYear: Int!
    $facilityBusinessId: Int!
    $transactionDetailDate: Int!
    $accountingDocumentId: Float!
    $fileStorageId: Int!
  ) {
    removeAccountingDocumentProof(
      companyId: $companyId
      fiscalYear: $fiscalYear
      facilityBusinessId: $facilityBusinessId
      transactionDetailDate: $transactionDetailDate
      accountingDocumentId: $accountingDocumentId
      fileStorageId: $fileStorageId
    )
  }
`;
