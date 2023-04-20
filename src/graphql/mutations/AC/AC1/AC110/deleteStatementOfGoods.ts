import gql from "graphql-tag";
export default gql`
  mutation deleteStatementOfGoods(
    $companyId: Int!,
    $fiscalYear: Int!,
    $facilityBusinessId: Int!,
    $transactionDetailDate: Int!,
    $accountingDocumentId: Float!
  ) {
    deleteStatementOfGoods(
      companyId: $companyId,
      fiscalYear: $fiscalYear,
      facilityBusinessId: $facilityBusinessId,
      transactionDetailDate: $transactionDetailDate,
      accountingDocumentId: $accountingDocumentId
    )
  }
`;
