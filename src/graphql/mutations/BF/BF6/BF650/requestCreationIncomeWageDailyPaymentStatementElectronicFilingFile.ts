
import gql from "graphql-tag";
export default gql`
mutation requestCreationIncomeWageDailyPaymentStatementElectronicFilingFile(
  $filter: ElectronicFilingIncomeWageDailyPaymentStatementSearchFilter!
  $emailInput: ReceiveEmailRequestInput!
  $companyIds: [Int!]!
) {
    requestCreationIncomeWageDailyPaymentStatementElectronicFilingFile(
      filter: $filter
      emailInput: $emailInput
      companyIds: $companyIds
  )
}

`