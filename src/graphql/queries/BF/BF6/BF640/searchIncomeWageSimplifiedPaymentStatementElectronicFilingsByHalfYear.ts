import gql from "graphql-tag";
export default gql`
query searchIncomeWageSimplifiedPaymentStatementElectronicFilingsByHalfYear($paymentYear: Int!,$paymentHalfYear: Int!) {
  searchIncomeWageSimplifiedPaymentStatementElectronicFilingsByHalfYear(paymentYear: $paymentYear,paymentHalfYear: $paymentHalfYear) {
    companyId
    paymentYear
    paymentHalfYear
    lastProductionRequestedAt
    company {
      code
      name
      address
      bizNumber
    }
    companyServiceContract{
      salesRepresentativeId
      manageUserId
      active
    }
  }
}

  `
