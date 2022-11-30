import gql from "graphql-tag";
export default gql`
  query getEmployeeWageDaily(
    $companyId: Int!
    $imputedYear: Int!
    $employeeId: Int!
  ) {
    getEmployeeWageDaily(
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
      deductionItems{
        itemCode
        amount
      }
    }
  }
`;
