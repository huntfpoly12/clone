import gql from "graphql-tag";
export default gql`
mutation createBankbook($companyId: Int!, $fiscalYear: Int!, $facilityBusinessId: Int!, $bankbookInput: BankbookCreateInput!, $scrapingInfoInput: ScrapingInfoInput) {
    createBankbook(companyId: $companyId, fiscalYear: $fiscalYear, facilityBusinessId: $facilityBusinessId, bankbookInput: $bankbookInput, scrapingInfoInput: $scrapingInfoInput){
      facilityBusinessId
    }
}
`
