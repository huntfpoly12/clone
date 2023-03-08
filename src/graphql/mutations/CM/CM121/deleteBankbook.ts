import gql from "graphql-tag";
export default gql`
mutation reorderBankbooks(companyId: Int!, fiscalYear: Int!, facilityBusinessId: Int!, bankbookId: Int!) {
    reorderBankbooks(companyId: $companyId, fiscalYear: $fiscalYear, facilityBusinessId: $facilityBusinessId, bankbookId: $bankbookId)
}
`
