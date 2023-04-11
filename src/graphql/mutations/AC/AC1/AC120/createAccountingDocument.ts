import gql from "graphql-tag";
export default gql`
  mutation createAccountingDocument(
    $companyId: Int!
    $fiscalYear: Int!
    $facilityBusinessId: Int!
    $transactionDetailDate: Int!
    $input: AccountingDocumentCreateInput!
  ) {
    createAccountingDocument(
      companyId: $companyId
      fiscalYear: $fiscalYear
      facilityBusinessId: $facilityBusinessId
      transactionDetailDate: $transactionDetailDate
      input: $input
    ) {
      scalar
    }
  }
`;
