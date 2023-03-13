import gql from "graphql-tag";
export default gql`
mutation deleteBankbook($companyId: Int!, $fiscalYear: Int!, $facilityBusinessId: Int!, $bankbookId: Int!) {
    deleteBankbook(companyId: $companyId, fiscalYear: $fiscalYear, facilityBusinessId: $facilityBusinessId, bankbookId: $bankbookId)
}
`
