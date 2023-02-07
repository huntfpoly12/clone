
import gql from "graphql-tag";
export default gql`
mutation requestCreationIncomeWageDailyPaymentStatementElectronicFilingFile(
  $input: ElectronicFilingCompanyPaymentMonthKeyInput!
) {
    requestCreationIncomeWageDailyPaymentStatementElectronicFilingFile(
    input: $input
  ) {
    electronicFilingId
  }
}

`