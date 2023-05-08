import gql from "graphql-tag";
export default gql`
  query getEmployeeWages($companyId: Int!, $imputedYear: Int!) {
    getEmployeeWages(companyId: $companyId, imputedYear: $imputedYear) {
      type
      employeeId
      # incomeTypeCode
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
      totalPay
      totalDeduction
      # totalDeduction
      # totalReduction
      deletable
      payItems {
        itemCode
        amount
      }
      deductionItems {
        itemCode
        amount
      }
      # reductionItems {
      #   itemCode
      #   amount
      # }
      dependents {
        employeeId
        # incomeTypeCode
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
        # residentId
      }
    }
  }
`;
