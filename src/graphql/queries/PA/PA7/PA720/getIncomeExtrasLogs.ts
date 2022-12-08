import gql from "graphql-tag";
export default gql`
  query getIncomeExtrasLogs(
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
  ) {
    getIncomeExtrasLogs(
      companyId: $companyId
      processKey: $processKey
    ) {
        ts
        incomeId
        paymentDay
        employeeType
        employeeId
        incomeTypeCode
        incomePayment
        withholdingIncomeTax
        withholdingLocalIncomeTax
        withholdingRuralSpecialTax
        prevPaymentDay
        createdAt
        createdBy
        updatedAt
        updatedBy
        ip
        active
        loggedAt
        remark
        paymentAmount
        requiredExpenses
        taxRate
    }
  }
`;
