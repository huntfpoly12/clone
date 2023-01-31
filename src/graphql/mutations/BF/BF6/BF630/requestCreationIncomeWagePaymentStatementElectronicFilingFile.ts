import gql from "graphql-tag";
export default gql`
mutation requestCreationIncomeWagePaymentStatementElectronicFilingFile( 
    $companyIds: [Int!]!
    $filter: ElectronicFilingIncomeWagePaymentStatementSearchFilter!
    $emailInput: ReceiveEmailRequestInput!
    ) {
      requestCreationIncomeWagePaymentStatementElectronicFilingFile( 
        companyIds : $companyIds
        filter: $filter
        emailInput: $emailInput
        )
    }`
