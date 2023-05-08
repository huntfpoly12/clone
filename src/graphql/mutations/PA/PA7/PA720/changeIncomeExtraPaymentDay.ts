import gql from "graphql-tag";
export default gql`
  mutation changeIncomeExtraPaymentDay(
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $incomeId: Int!
    $day: Int!
  ) {
    changeIncomeExtraPaymentDay(
      companyId: $companyId
      processKey: $processKey
      incomeId: $incomeId
      day: $day
    ) {
      incomeId
      imputedMonth
      paymentYear
      paymentMonth
      paymentDay
      employeeType
      employeeId
      # incomeTypeCode
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
      paymentAmount
      requiredExpenses
      taxRate
      actualPayment
    }
  }
`;
