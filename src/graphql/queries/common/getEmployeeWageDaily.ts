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
      retirementIncome
      nationalPensionDeduction
      healthInsuranceDeduction
      longTermCareInsuranceDeduction
      employeementInsuranceDeduction
      insuranceSupport
      nationalPensionSupportPercent
      employeementInsuranceSupportPercent
      weeklyWorkingHours
      monthlyPaycheck
      workingDays
      dailyWage
      monthlyWage
      totalDeduction
      deletable
<<<<<<<< HEAD:src/graphql/queries/common/getEmployeeWageDailies.ts
========
      nationalPensionSupportPercent
      joinedAt
      leavedAt
>>>>>>>> 79803ef8 (fix pa 610):src/graphql/queries/common/getEmployeeWageDaily.ts
      deductionItems{
        itemCode
        amount
      }
    }
  }
`;
