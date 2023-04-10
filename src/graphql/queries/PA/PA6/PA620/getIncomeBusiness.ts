import gql from "graphql-tag";
export default gql`
  query getIncomeBusiness(
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $incomeId: Int!
  ) {
    getIncomeBusiness(
      companyId: $companyId
      processKey: $processKey
      incomeId: $incomeId
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
      paymentAmount
      taxRate
      actualPayment
      employee {
        name
        incomeTypeName
      }
    }
  }
`;
