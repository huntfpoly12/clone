import gql from "graphql-tag";
export default gql`
  mutation initializeTransactionDetails(
    $companyId: Int!
    $fiscalYear: Int!
    $facilityBusinessId: Int!
    $bankbookDetailDate: Int!
    $bankbookDetailId: Int!
  ) {
    initializeTransactionDetails(
      companyId: $companyId
      fiscalYear: $fiscalYear
      facilityBusinessId: $facilityBusinessId
      bankbookDetailDate: $bankbookDetailDate
      bankbookDetailId: $bankbookDetailId
    ) {
      transactionDetailDate
    }
  }
`;
