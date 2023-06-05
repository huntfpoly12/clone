import gql from "graphql-tag";
export default gql`
  query calculateMidTermSettlement(
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $paymentDay: Int!
    $employeeId: Int!
  ) {
    calculateMidTermSettlement(
        companyId: $companyId
        processKey: $processKey
        paymentDay: $paymentDay
        employeeId: $employeeId
    ) {
      deductibleIncomeTaxAmount
      deductibleLocalIncomeTaxAmount
    }
  }
`;
