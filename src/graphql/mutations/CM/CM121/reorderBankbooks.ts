import gql from "graphql-tag";
export default gql`
mutation reorderBankbooks(companyId: Int!, fiscalYear: Int!, facilityBusinessId: Int!, inputs: [BankbookReorderInput!]!) {
    reorderBankbooks(companyId: $companyId, fiscalYear: $fiscalYear, facilityBusinessId: $facilityBusinessId, inputs: $inputs)
}
`
