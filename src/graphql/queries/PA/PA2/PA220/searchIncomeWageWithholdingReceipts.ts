import gql from "graphql-tag";
export default gql`
  query searchIncomeWageWithholdingReceipts(
    $companyId: Int!
    $filter: IncomeWageWithholdingReceiptSearchFilter!
  ) {
    searchIncomeWageWithholdingReceipts(
      companyId: $companyId
      filter: $filter
    ) {
      incomeId
      imputedMonth
      paymentYear
      paymentMonth
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
      leaved
      annualEarnedIncome
      taxFreeIncome
      totalSalary
      earnedIncomeDeduction
      earnedIncomeAmount
      personalDeduction
      pensionPremiumDeduction
      specialIncomeDeduction
      otherIncomeDeduction
      taxStandard
      calculationTaxAmount
      taxReduction
      taxCredit
      decidedTaxAmount
      prePaidTaxAmount
      deductibleTaxAmount
    }
  }
`;
