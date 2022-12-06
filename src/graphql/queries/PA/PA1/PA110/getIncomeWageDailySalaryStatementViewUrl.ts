import gql from "graphql-tag";
export default gql`
  query getIncomeWageDailySalaryStatementViewUrl(
    $companyId: Int!
    $imputedYear: Int!
    $incomeIds: [Int!]!
  ) {
    getIncomeWageDailySalaryStatementViewUrl(
      companyId: $companyId
      imputedYear: $imputedYear
      incomeIds: $incomeIds
    )
  }
`;
