import gql from "graphql-tag";
export default gql`
mutation copyIncomeExtras( 
  $companyId: Int!
  $source: IncomeProcessKeyInput!
  $target: IncomeProcessKeyInput!
  ) {
  copyIncomeExtras( 
      companyId : $companyId,
      source: $source, 
      target: $target,
  ){
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
    requiredExpenses
    taxRate
    actualPayment
    employee {
      type
      employeeId
      incomeTypeCode
      name
      foreigner
      nationality
      nationalityCode
      stayQualification
      residentIdValidity
      roadAddress
      addressExtend
      email
      department
      responsibility
      status
      withholdingIncomeTax
      withholdingLocalIncomeTax
      withholdingRuralSpecialTax
      createdAt
      createdBy
      updatedAt
      updatedBy
      ip
      active
      residentId
      incomeTypeName
      deletable
    }
  }
}`