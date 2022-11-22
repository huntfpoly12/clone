import gql from "graphql-tag";
export default gql`
query getEmployeeExtrasLogs(
    $companyId: Int!,
    $imputedYear : Int! 
    ) {
    getEmployeeExtrasLogs(companyId : $companyId, imputedYear : $imputedYear ) {
        ts
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
  }
}
`