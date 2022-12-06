import gql from "graphql-tag";
export default gql`
  query getIncomeWageDaily(
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $incomeId: Int!
  ) {
    getIncomeWageDaily(
      companyId: $companyId
      processKey: $IncomeProcessKeyInput
      incomeId: $incomeId
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
      dailyWage
      monthlyWage
      totalDeduction
      workingDays
      actualPayment
      employee
      deductionItems {
        itemCode
        amount
      }
    }
  }
`;
