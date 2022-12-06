import gql from "graphql-tag";
export default gql`
  query calculateIncomeWageTax(
    $companyId: Int!
    $imputedYear: Int!
    $totalTaxPay: Int!
    $dependentCount: Int!
  ) {
    calculateIncomeWageTax(  
        companyId: $companyId
        imputedYear: $imputedYear
        totalTaxPay: $totalTaxPay
        dependentCount: $dependentCount) {

    }
  }
`;
