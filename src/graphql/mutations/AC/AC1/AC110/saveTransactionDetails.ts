import gql from "graphql-tag";
export default gql`
  mutation saveTransactionDetails(
    $companyId: Int!,
    $fiscalYear: Int!,
    $facilityBusinessId: Int!,
    $bankbookDetailId: Int!,
    $bankbookDetailDate: Int!,
    $creates: [TransactionDetailCreateInput!],
    $updates: [TransactionDetailUpdateInput!]
  ) {
    saveTransactionDetails(
      companyId: $companyId,
      fiscalYear: $fiscalYear,
      facilityBusinessId: $facilityBusinessId,
      bankbookDetailId: $bankbookDetailId,
      bankbookDetailDate: $bankbookDetailDate,
      creates: $creates,
      updates: $updates
    ) {
      bankbookDetailId
    }
  }
`;
