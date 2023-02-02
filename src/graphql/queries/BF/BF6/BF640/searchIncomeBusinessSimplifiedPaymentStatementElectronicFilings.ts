import gql from "graphql-tag";
export default gql`
query SearchIncomeBusinessSimplifiedPaymentStatementElectronicFilings($filter: ElectronicFilingIncomeBusinessSimplifiedPaymentStatementSearchFilter!) {
  searchIncomeBusinessSimplifiedPaymentStatementElectronicFilings(filter: $filter) {
    companyId
    paymentYear
    paymentMonth
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