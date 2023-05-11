import gql from "graphql-tag";
export default gql`
  query getIncomeWagesLogs(
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
  ) {
    getIncomeWagesLogs(companyId: $companyId, processKey: $processKey) {
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
      totalPay
      totalTaxPay
      totalTaxfreePay
      totalDeduction
      workingDays
      totalWorkingHours
      overtimeWorkingHours
      workingHoursAtNight
      workingHoursOnHolidays
      intermidiateIncomeTax
      intermidiateLocalIncomeTax
      yearEndSettlementIncomeTax
      yearEndSettlementLocalIncomeTax
      yearEndSettlementRuralSpecialTax
      actualPayment
      payItemsInfo
      deductionItemsInfo
    }
  }
`;
