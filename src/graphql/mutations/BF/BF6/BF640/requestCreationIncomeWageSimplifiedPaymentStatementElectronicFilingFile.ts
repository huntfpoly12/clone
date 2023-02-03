import gql from "graphql-tag";
export default gql`
mutation RequestCreationIncomeWageSimplifiedPaymentStatementElectronicFilingFile(
  $filter: ElectronicFilingIncomeWageSimplifiedPaymentStatementSearchFilter!
  $emailInput: ReceiveEmailRequestInput!
  $companyIds: [Int!]!
) {
  requestCreationIncomeWageSimplifiedPaymentStatementElectronicFilingFile(
    filter: $filter
    emailInput: $emailInput
    companyIds: $companyIds
  )
}

`
