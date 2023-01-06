import gql from "graphql-tag";
export default gql`
  query getEmployeeWage(
    $companyId: Int!
    $imputedYear: Int!
    $employeeId: Int!
  ) {
    getEmployeeWage(
      companyId: $companyId
      imputedYear: $imputedYear
      employeeId: $employeeId
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
      nationalPensionDeduction
      healthInsuranceDeduction
      longTermCareInsuranceDeduction
      employeementInsuranceDeduction
      insuranceSupport
      nationalPensionSupportPercent
      employeementInsuranceSupportPercent
      employeementReduction
      employeementReductionStartDate
      employeementReductionFinishDate
      employeementReductionRatePercent
      employeementReductionInput
      weeklyWorkingHours
      deductionDependentCount
      incomeTaxMagnification
      incomePayment
      totalPay
      totalDeduction
      deletable
      deletable
      payItems {
        itemCode
        amount
      }
      deductionItems {
        itemCode
        amount
      }
      dependents {
        employeeId
        incomeTypeCode
        index
        relation
        name
        foreigner
        residentIdValidity
        basicDeduction
        women
        singleParent
        senior
        disabled
        maternityAdoption
        descendant
        consignmentRelationship
        householder
        residentId
      }
    }
  }
`;
