import gql from "graphql-tag";
export default gql`
  query getIncomeRetirementsLogs($companyId: Int!, $processKey: IncomeProcessKeyInput!) {
    getIncomeRetirementsLogs(companyId: $companyId, processKey: $processKey) {
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
    }
  }
`;
