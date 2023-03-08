import gql from "graphql-tag";
export default gql`
mutation reorderBankbooks(companyId: Int!, fiscalYear: Int!, facilityBusinessId: Int!, bankbookInput: BankbookCreateInput!, scrapingInfoInput: ScrapingInfoInput) {
    reorderBankbooks(companyId: $companyId, fiscalYear: $fiscalYear, facilityBusinessId: $facilityBusinessId, bankbookInput: $bankbookInput, scrapingInfoInput: $scrapingInfoInput)
}
`
