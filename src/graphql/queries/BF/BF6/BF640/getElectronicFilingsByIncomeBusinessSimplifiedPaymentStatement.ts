import gql from "graphql-tag";
export default gql`
query ExampleQuery($input: ElectronicFilingCompanyPaymentMonthKeyInput!) { 
  getElectronicFilingsByIncomeBusinessSimplifiedPaymentStatement(input: $input) {
    productionStatus
  }
}

  `