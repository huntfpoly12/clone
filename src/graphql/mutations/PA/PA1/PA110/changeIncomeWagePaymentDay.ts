import gql from "graphql-tag";
export default gql`
  mutation changeIncomeWagePaymentDay(
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $incomeId: Int!
    $day: Int!
  ) {
    changeIncomeWagePaymentDay(
      companyId: $companyId
      processKey: $processKey
      incomeId: $incomeId
      day: $day
    ) {
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
      employee {
        type
      }
      payItems {
        itemCode
        amount
      }
      deductionItems {
        itemCode
        amount
      }
      midTermSettlement
    }
  }
`;
