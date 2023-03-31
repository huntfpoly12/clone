import gql from "graphql-tag";
export default gql`
  mutation syncBankbookDetails(
    $companyId: Int!,
    $fiscalYear: Int!,
    $facilityBusinessId: Int!,
    $bankbookDetailId: Int!,
    $bankbookDetailDate: Int!,
    $creates: [TransactionDetailCreateInput!],
    $updates: [TransactionDetailCreateInput!]
  ) {
    syncBankbookDetails(
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
