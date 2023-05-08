import gql from "graphql-tag";
export default gql`
    query findEmployeesForIncomeRetirement(
        $companyId: Int!
        $imputedMonth: Int!
        $imputedYear: Int!
        $retirementType: Int!) {
        findEmployeesForIncomeRetirement(
            companyId: $companyId
            imputedMonth: $imputedMonth
            imputedYear: $imputedYear
            retirementType: $retirementType
        ) {
            employeeWages {
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
                president
                householder
                nationalPensionDeduction
                healthInsuranceDeduction
                longTermCareInsuranceDeduction
                employeementInsuranceDeduction
                insuranceSupport
                nationalPensionSupportPercent
                employeementInsuranceSupportPercent
            }
            employeeWageDailies {
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
                deductionItems{
                    itemCode
                    amount
                }
            }
        }
    }
`
