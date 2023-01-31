import gql from "graphql-tag";
export default gql`
mutation requestCreationIncomeExtraPaymentStatementElectronicFilingFile( 
    $companyIds: [Int!]!
    $filter: ElectronicFilingIncomeExtraPaymentStatementSearchFilter!
    $emailInput: ReceiveEmailRequestInput!
    ) {
      requestCreationIncomeExtraPaymentStatementElectronicFilingFile( 
        companyIds : $companyIds
        filter: $filter
        emailInput: $emailInput
        )
    }`
