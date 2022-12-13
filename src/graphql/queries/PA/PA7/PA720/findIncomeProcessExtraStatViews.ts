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
      imputedYear
      imputedMonth
      imputedYearMonth
      paymentYear
      paymentMonth
      incomeCount
    }
  }
`;
