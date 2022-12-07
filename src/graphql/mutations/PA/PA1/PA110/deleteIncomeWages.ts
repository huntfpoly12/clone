import gql from "graphql-tag";
export default gql`
  mutation deleteIncomeWages(
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $incomeIds: [Int!]!
  ) {
    deleteIncomeWages(
      companyId: $companyId
      processKey: $processKey
      incomeIds: $incomeIds
    )
  }
`;
