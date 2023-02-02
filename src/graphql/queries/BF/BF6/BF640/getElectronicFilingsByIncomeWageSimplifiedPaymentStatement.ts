import gql from "graphql-tag";
export default gql`
query ExampleQuery($input: ElectronicFilingCompanyPaymentHalfYearKeyInput!) { 
  getElectronicFilingsByIncomeWageSimplifiedPaymentStatement(input: $input) {
    productionStatus
  }
}

  `