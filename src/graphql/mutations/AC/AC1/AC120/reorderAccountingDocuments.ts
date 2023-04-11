import gql from "graphql-tag";
export default gql`
  mutation reorderAccountingDocuments(
    $companyId: Int!
    $fiscalYear: Int!
    $facilityBusinessId: Int!
    $transactionDetailDate: Int!
    $inputs: [AccountingDocumentReorderInput!]!
  ) {
    reorderAccountingDocuments(
      companyId: $companyId
      fiscalYear: $fiscalYear
      facilityBusinessId: $facilityBusinessId
      transactionDetailDate: $transactionDetailDate
      inputs: $inputs
    ) {
      bankbookId
    }
  }
`;
