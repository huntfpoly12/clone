import gql from "graphql-tag";
export default gql`
  query findIncomeProcessBusinessStatViews(
    $companyId: Int!
    $filter: FindIncomeProcessStatFilter!
  ) {
    findIncomeProcessBusinessStatViews(
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
