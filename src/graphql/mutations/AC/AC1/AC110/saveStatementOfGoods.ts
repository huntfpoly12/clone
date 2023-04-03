import gql from "graphql-tag";
export default gql`
  mutation saveStatementOfGoods(
    $companyId: Int!,
    $fiscalYear: Int!,
    $facilityBusinessId: Int!,
    $transactionDetailDate: Int!,
    $accountingDocumentId: [Int!]!,
    $items: [StatementOfGoodsItemInput!]!

  ) {
    saveStatementOfGoods(
      companyId: $companyId,
      fiscalYear: $fiscalYear,
      facilityBusinessId: $facilityBusinessId,
      transactionDetailDate: $transactionDetailDate,
      accountingDocumentId: $accountingDocumentId,
      items: $items
    )
  }
`;
