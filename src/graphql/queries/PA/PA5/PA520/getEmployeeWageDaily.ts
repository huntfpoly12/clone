import gql from "graphql-tag";
export default gql`
  query getEmployeeWageDaily($companyId: Int!, $imputedYear: Int!,$employeeId:Int!) {
    getEmployeeWageDaily(companyId: $companyId, imputedYear: $imputedYear, employeeId : $employeeId) {
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
      weeklyWorkingHours    
      totalDeduction 
      deletable 
      retirementIncome
       
    }
  }
`;
