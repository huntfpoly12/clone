import gql from "graphql-tag";
export default gql`
mutation updateBankbook(
  $facilityBusinessId: Int!
  $bankbookId: Int!
  $companyId: Int!
  $fiscalYear: Int!
  $bankbookInput: BankbookUpdateInput!
  $scrapingInfoInput: ScrapingInfoInput
) {
    updateBankbook(
      facilityBusinessId: $facilityBusinessId,
      bankbookId: $bankbookId,
      companyId: $companyId,
      fiscalYear: $fiscalYear,
      bankbookInput: $bankbookInput,
      scrapingInfoInput: $scrapingInfoInput){
        facilityBusinessId
    }
}
`
