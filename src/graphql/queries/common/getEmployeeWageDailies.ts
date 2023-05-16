import gql from "graphql-tag";
export default gql`
  query getEmployeeWageDailies($companyId: Int!, $imputedYear: Int!) {
    getEmployeeWageDailies(companyId: $companyId, imputedYear: $imputedYear) {
      addressExtend
      deductionItems {
        itemCode
        amount
      }
      deletable 
      department
      email
      employeeId
      employeementInsuranceDeduction
      employeementInsuranceSupportPercent 
      foreigner
      healthInsuranceDeduction
      joinedAt
      leavedAt  
      monthlyWage
      name
      nationality
      nationalityCode
      nationalPensionDeduction
      nationalPensionSupportPercent
      residentId
      residentIdValidity
      responsibility
      retirementIncome
      roadAddress
      status
      stayQualification
      totalDeduction 
      type
      weeklyWorkingHours    
      withholdingIncomeTax
      withholdingLocalIncomeTax
      withholdingRuralSpecialTax  
    }
  }
  `;
  // supportAmount
