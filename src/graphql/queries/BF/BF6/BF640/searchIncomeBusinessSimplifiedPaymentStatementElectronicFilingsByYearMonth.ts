import gql from "graphql-tag";
export default gql`
query searchIncomeBusinessSimplifiedPaymentStatementElectronicFilingsByYearMonth($paymentYear: Int!,$paymentMonth: Int!) {
  searchIncomeBusinessSimplifiedPaymentStatementElectronicFilingsByYearMonth(paymentYear: $paymentYear,paymentMonth: $paymentMonth) {
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
      companyServiceContract{
        salesRepresentativeId
        manageUserId
        active
      }
    }
  }
  `
