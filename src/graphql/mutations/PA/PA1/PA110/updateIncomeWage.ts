import gql from "graphql-tag";
export default gql`
  mutation updateIncomeWage(
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $incomeIds: Int!
    $input: IncomeWageUpdateInput!
  ) {
    updateIncomeWage(
      companyId: $companyId
      processKey: $processKey
      incomeIds: $incomeIds
      input: $input
    )
  }
`;
