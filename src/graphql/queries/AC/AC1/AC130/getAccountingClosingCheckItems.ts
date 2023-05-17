import gql from "graphql-tag";
export default gql`
  query getAccountingClosingCheckItems(
    $companyId: Int!
    $fiscalYear: Int!
    $facilityBusinessId: Int!
    $year: Int!
    $month: Int!
  ) {
    getAccountingClosingCheckItems(
      companyId: $companyId
      fiscalYear: $fiscalYear
      facilityBusinessId: $facilityBusinessId
      year: $year
      month: $month
    ) {
      cashRegisterSummary {
        totalIncome
        totalSpending
        bankbookBalance
        totalRevenue
        totalExpenditure
      }
      revenueBudgetSummary {
        amount
        currentMonthExecution
        cumulativeTotal
      }
      expenditureBudgetSummary {
        amount
        currentMonthExecution
        cumulativeTotal
      }
      laborCostSubjectSummaries {
        name
        amount
        currentMonthExecution
        cumulativeTotal
      }
    }
  }
`;
