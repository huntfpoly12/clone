import gql from "graphql-tag";
export default gql`
query getEmployeeWageDailiesLogs(
    $companyId: Int!,
    $imputedYear : Int! 
    ) {
    getEmployeeWageDailiesLogs(companyId : $companyId, imputedYear : $imputedYear ) {
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
        joinedAt
        leavedAt
        retirementIncome
        weeklyWorkingHours
        monthlyPaycheck
        workingDays
        dailyWage
        monthlyWage
        totalDeduction
        deductionItems
  }
}
`