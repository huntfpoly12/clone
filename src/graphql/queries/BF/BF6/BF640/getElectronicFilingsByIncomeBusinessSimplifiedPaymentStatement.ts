import gql from "graphql-tag";
export default gql`
query getElectronicFilingsByIncomeBusinessSimplifiedPaymentStatement($input: ElectronicFilingCompanyPaymentMonthKeyInput!) { 
  getElectronicFilingsByIncomeBusinessSimplifiedPaymentStatement(input: $input) {
    productionStatus
    causeOfProductionFailure
  }
}

  `
