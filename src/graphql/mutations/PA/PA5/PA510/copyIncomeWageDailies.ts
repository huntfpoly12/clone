import gql from "graphql-tag";
export default gql`
mutation copyIncomeWageDailies( 
    $companyId: Int!
    $source: IncomeProcessKeyInput!
    $target: IncomeProcessKeyInput!
    $targetDay: Int!
    ) {
        copyIncomeWageDailies( 
            companyId: $companyId
            source: $source
            target: $target
            targetDay: $targetDay
        ) {
            incomeId
            imputedMonth
            paymentYear
            paymentMonth
            paymentDay
            employeeType
            employeeId
            incomePayment
            withholdingIncomeTax
            withholdingLocalIncomeTax
            withholdingRuralSpecialTax
            prevPaymentDay
            createdAt
            createdBy
            updatedAt
            updatedBy
            ip
            active
            dailyWage
            monthlyWage
            totalDeduction
            workingDays
            actualPayment
            employee {
                type
            }
            deductionItems {
                itemCode
                amount
            }
        }
    }`