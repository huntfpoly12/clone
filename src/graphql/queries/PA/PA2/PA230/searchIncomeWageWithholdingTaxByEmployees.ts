import gql from "graphql-tag";
export default gql`
query SearchIncomeWageWithholdingTaxByEmployees(
    $companyId: Int!
    $filter: IncomeWageWithholdingTaxByEmployeeSearchFilter!
  ) {
    searchIncomeWageWithholdingTaxByEmployees(
      companyId: $companyId
      filter: $filter
    ) {
      employeeId
      totalPay
      employee {
        type
        employeeId
        incomeTypeCode
        name
        email
        foreigner
        nationality
        nationalityCode
        stayQualification
        residentIdValidity
        roadAddress
        addressExtend 
        department
        responsibility
        status 
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
      }
    }
  }
  ` 