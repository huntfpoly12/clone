import gql from "graphql-tag";
export default gql`
    query
    getEmployeeWageDailies(
            $companyId: Int!
            $imputedYear: Int!
        ){
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
                supportAmount
                }
            }
        }`