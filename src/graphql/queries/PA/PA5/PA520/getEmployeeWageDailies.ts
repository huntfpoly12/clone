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
      joinedAt
      leavedAt  
      weeklyWorkingHours    
      totalDeduction 
      deletable 
      nationalPensionDeduction
      healthInsuranceDeduction
      employeementInsuranceDeduction
      nationalPensionSupportPercent
      employeementInsuranceSupportPercent
      
      deductionItems {
        itemCode
        amount
        supportAmount
      }  
    }
  }
`;
// employeementReductionRatePercent
//       incomeTaxMagnification