import gql from "graphql-tag";
export default gql`
mutation requestCreationIncomeBusinessSimplifiedPaymentStatementElectronicFilingFile(
  $filter: ElectronicFilingIncomeBusinessSimplifiedPaymentStatementSearchFilter!
  $emailInput: ReceiveEmailRequestInput!
  $companyIds: [Int!]!
) {
  requestCreationIncomeBusinessSimplifiedPaymentStatementElectronicFilingFile(
    filter: $filter
    emailInput: $emailInput
    companyIds: $companyIds
  )
}

`
