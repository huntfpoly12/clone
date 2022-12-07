import gql from "graphql-tag";
export default gql`
  mutation findIncomeProcessWageStatViews(
    $companyId: Int!
    $filter: FindIncomeProcessStatFilter!
  ) {
    findIncomeProcessWageStatViews(companyId: $companyId, filter: $filter) {
      imputedYear
      imputedMonth
      imputedYearMonth
      paymentYear
      paymentMonth
      incomeCount
    }
  }
`;
