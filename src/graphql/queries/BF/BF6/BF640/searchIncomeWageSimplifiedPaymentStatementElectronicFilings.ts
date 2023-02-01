import gql from "graphql-tag";
export default gql`
query SearchIncomeWageSimplifiedPaymentStatementElectronicFilings($filter: ElectronicFilingIncomeWageSimplifiedPaymentStatementSearchFilter!) {
    searchIncomeWageSimplifiedPaymentStatementElectronicFilings(filter: $filter) {
      companyId
      lastProductionRequestedAt 
      company {
        code
        name
        address
        bizNumber
      }
    }
  }
  `