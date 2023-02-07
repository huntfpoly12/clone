import gql from "graphql-tag";
export default gql`
mutation requestCreationIncomeBusinessPaymentStatementElectronicFilingFile( 
    $companyIds: [Int!]!
    $filter: ElectronicFilingIncomeBusinessPaymentStatementSearchFilter!
    $emailInput: ReceiveEmailRequestInput!
    ) {
      requestCreationIncomeBusinessPaymentStatementElectronicFilingFile( 
        companyIds : $companyIds
        filter: $filter
        emailInput: $emailInput
        )
    }`
