import gql from "graphql-tag";
export default gql`
  mutation saveMidTermSettlement(
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $paymentDay: Int!
    $employeeId: Int!
  ) {
    saveMidTermSettlement(
      companyId: $companyId
      processKey: $processKey
      paymentDay: $paymentDay
      employeeId: $employeeId
    ) {
      incomeId
    }
  }
`;
