import gql from "graphql-tag";
export default gql`
mutation requestCreationIncomeRetirementPaymentStatementElectronicFilingFile( 
    $companyIds: [Int!]!
    $filter: ElectronicFilingIncomeWagePaymentStatementSearchFilter!
    $emailInput: ReceiveEmailRequestInput!
    ) {
      requestCreationIncomeRetirementPaymentStatementElectronicFilingFile( 
        companyIds : $companyIds
        filter: $filter
        emailInput: $emailInput
        )
    }`
