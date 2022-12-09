import gql from "graphql-tag";
export default gql`
mutation createIncomeExtra( 
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $input: IncomeExtraCreateInput!
    ) {
      createIncomeExtra( 
      companyId : $companyId,
      processKey: $processKey, 
      input: $input,
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