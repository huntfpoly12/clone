import gql from "graphql-tag";
export default gql`
mutation copyIncomeWageDailies( 
    $companyId: Int!
    $source: IncomeProcessKeyInput!
    $target: IncomeProcessKeyInput!
    ) {
        copyIncomeWageDailies( 
            companyId: $companyId
            source: $source
            target: $target
        ) {
            incomeId
            imputedMonth
            paymentYear
            paymentMonth
            paymentDay
            employeeType
            employeeId
            incomeTypeCode
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
            employee
            deductionItems
        }
    }`