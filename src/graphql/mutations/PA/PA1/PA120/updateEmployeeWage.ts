import gql from "graphql-tag";
export default gql`
  mutation updateEmployeeWage(
    $companyId: Int!
    $imputedYear: Int!
    $employeeId: Int!
    $input: EmployeeWageDailyUpdateInput!
  ) {
    updateEmployeeWage(
      companyId: $companyId
      imputedYear: $imputedYear
      employeeId: $employeeId
      input: $input
    ) {
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
      deletable
      payItems
      deductionItems
      reductionItems
      dependents
    }
  }
`;
