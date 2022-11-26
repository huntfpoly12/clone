import gql from "graphql-tag";
export default gql`
  query getEmployeeWagesLogs($companyId: Int!, $imputedYear: Int!) {
    getEmployeeWagesLogs(companyId: $companyId, imputedYear: $imputedYear) {
      ts
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
      loggedAt
      remark
      joinedAt
      leavedAt
      president
      householder
      weeklyWorkingHours
      deductionDependentCount
      incomeTaxMagnification
      incomePayment
      totalPay
      totalDeduction
      totalReduction
      payItems
      deductionItems
      reductionItems
      dependents
    }
  }
`;
