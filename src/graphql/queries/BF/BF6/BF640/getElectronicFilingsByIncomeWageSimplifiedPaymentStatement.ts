import gql from "graphql-tag";
export default gql`
query getElectronicFilingsByIncomeWageSimplifiedPaymentStatement($input: ElectronicFilingCompanyPaymentHalfYearKeyInput!) { 
  getElectronicFilingsByIncomeWageSimplifiedPaymentStatement(input: $input) {
    productionStatus
  }
}

  `
