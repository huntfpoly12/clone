import gql from "graphql-tag";
export default gql`
  query getBankbooksForWork(
    $companyId: Int!
    $fiscalYear: Int!
    $facilityBusinessId: Int!
  ) {
    getBankbooksForWork(
      companyId: $companyId
      fiscalYear: $fiscalYear
      facilityBusinessId: $facilityBusinessId
    ) {
        facilityBusinessId
        bankbookId
        bankbookNumber
        bankbookNickname
    }
  }
`;
