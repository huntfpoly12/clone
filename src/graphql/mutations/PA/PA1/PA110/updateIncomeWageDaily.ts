import gql from "graphql-tag";
export default gql`
  mutation updateIncomeWageDaily(
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $incomeIds: Int!
    $input: IncomeWageDailyUpdateInput!
  ) {
    updateIncomeWageDaily(
      companyId: $companyId
      processKey: $processKey
      incomeIds: $incomeIds
      input: $input
    )
  }
`;
