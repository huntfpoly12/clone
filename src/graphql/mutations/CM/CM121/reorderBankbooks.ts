import gql from "graphql-tag";
export default gql`
mutation reorderBankbooks($companyId: Int!, $fiscalYear: Int!, $inputs: [BankbookReorderInput!]!) {
    reorderBankbooks(companyId: $companyId, fiscalYear: $fiscalYear, inputs: $inputs)
}
`
