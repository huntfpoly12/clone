import gql from "graphql-tag";
export default gql`
  mutation createIncomeWage(
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $input: IncomeWageCreateInput!
  ) {
    createIncomeWage(
      companyId: $companyId
      processKey: $processKey
      input: $input
    ) {
      incomeId
    }
  }
`;
