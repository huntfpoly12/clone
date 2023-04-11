import gql from "graphql-tag";
export default gql`
  mutation updateAccountingDocument(
    $companyId: Int!
    $fiscalYear: Int!
    $facilityBusinessId: Int!
    $transactionDetailDate: Int!
    $accountingDocumentId: Float!
    $input: AccountingDocumentUpdateInput!
  ) {
    updateAccountingDocument(
      companyId: $companyId
      fiscalYear: $fiscalYear
      facilityBusinessId: $facilityBusinessId
      transactionDetailDate: $transactionDetailDate
      accountingDocumentId: $accountingDocumentId
      input: $input
    ) {
        bankbookId
    }
  }
`;
