import gql from "graphql-tag";
export default gql`
  query findIncomeProcessExtraStatViews(
    $companyId: Int!
    $filter: FindIncomeProcessStatFilter!
  ) {
    findIncomeProcessExtraStatViews(
      companyId: $companyId
      filter: $filter
    ) {
      mputedYear
      imputedMonth
      imputedYearMonth
      paymentYear
      paymentMonth
      incomeCount
    }
  }
`;
