import gql from "graphql-tag";
export default gql`
  mutation updateIncomeWage(
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $incomeId: Int!
    $input: IncomeWageUpdateInput!
  ) {
    updateIncomeWage(
      companyId: $companyId
      processKey: $processKey
      incomeId: $incomeId
      input: $input
    ) {
      incomeId
    }
  }
`;
