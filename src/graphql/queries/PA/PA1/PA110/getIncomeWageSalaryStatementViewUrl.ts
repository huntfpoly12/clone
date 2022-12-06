import gql from "graphql-tag";
export default gql`
  query getIncomeWageSalaryStatementViewUrl(
    $companyId: Int!
    $imputedYear: Int!
    $incomeIds: [Int!]!
  ) {
    getIncomeWageSalaryStatementViewUrl(
      companyId: $companyId
      imputedYear: $imputedYear
      incomeIds: $incomeIds
    )
  }
`;
