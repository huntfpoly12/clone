import gql from "graphql-tag";
export default gql`
  mutation findIncomeProcessWageDailyStatViews(
    $companyId: Int!
    $filter: FindIncomeProcessStatFilter!
  ) {
    findIncomeProcessWageDailyStatViews(
      companyId: $companyId
      filter: $filter
    ) {
      imputedYear
      imputedMonth
      imputedYearMonth
      paymentYear
      paymentMonth
      incomeCount
    }
  }
`;
