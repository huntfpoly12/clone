import gql from "graphql-tag";
export default gql`
  mutation deleteMidTermSettlement(
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $employeeId: Int!
    $paymentDay: Int!
  ) {
    deleteMidTermSettlement(
      companyId: $companyId
      processKey: $processKey
      employeeId: $employeeId
      paymentDay: $paymentDay
    )
  }
`;
