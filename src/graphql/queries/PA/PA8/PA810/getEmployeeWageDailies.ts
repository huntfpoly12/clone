import gql from "graphql-tag";
export default gql`
  query getEmployeeWageDailies($companyId: Int!, $imputedYear: Int!) {
    getEmployeeWageDailies(companyId: $companyId, imputedYear: $imputedYear) {
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
      residentId
      retirementIncome
      nationalPensionDeduction
      healthInsuranceDeduction
      longTermCareInsuranceDeduction
      employeementInsuranceDeduction
      insuranceSupport
      nationalPensionDeduction
      employeementInsuranceSupportPercent
      weeklyWorkingHours
      monthlyPaycheck
      workingDays
      dailyWage
      monthlyWage
      totalDeduction
      deletable
      nationalPensionSupportPercent
      joinedAt
      leavedAt
      deductionItems {
        itemCode
        amount
      }
    }
  }
`;
