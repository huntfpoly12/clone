import gql from "graphql-tag";
export default gql`
query getEmployeeBusinessesLogs ($companyId: Int!,$imputedYear : Int!) {
  getEmployeeBusinessesLogs(companyId : $companyId, imputedYear : $imputedYear) { 
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
    loggedAt 
    remark 
    incomeTypeName 
    ts
  }
}
`
