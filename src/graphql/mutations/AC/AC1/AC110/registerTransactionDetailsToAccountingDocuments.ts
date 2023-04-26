import gql from "graphql-tag";
export default gql`
  mutation registerTransactionDetailsToAccountingDocuments(
    $companyId: Int!,
    $fiscalYear: Int!,
    $facilityBusinessId: Int!,
    $keys: [BankbookDetailKeyInput!]!
  ) {
    registerTransactionDetailsToAccountingDocuments(
      companyId: $companyId,
      fiscalYear: $fiscalYear,
      facilityBusinessId: $facilityBusinessId,
      keys: $keys
    )
  }
`;
