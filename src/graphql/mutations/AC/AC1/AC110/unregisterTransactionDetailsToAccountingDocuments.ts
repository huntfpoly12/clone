import gql from "graphql-tag";
export default gql`
  mutation unregisterTransactionDetailsToAccountingDocuments(
    $companyId: Int!,
    $fiscalYear: Int!,
    $facilityBusinessId: Int!,
    $bankbookDetailDate: Int!,
    $bankbookDetailIds: Int!
  ) {
    unregisterTransactionDetailsToAccountingDocuments(
      companyId: $companyId,
      fiscalYear: $fiscalYear,
      facilityBusinessId: $facilityBusinessId,
      bankbookDetailDate: $bankbookDetailDate,
      bankbookDetailIds: $bankbookDetailIds
    )
  }
`;
