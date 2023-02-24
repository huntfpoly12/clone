import gql from "graphql-tag";
export default gql`
mutation changeIncomeWageDailyPaymentDay( 
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $incomeId: Int!
    $day: Int!
    ) {
        changeIncomeWageDailyPaymentDay( 
            companyId: $companyId
            processKey: $processKey
            incomeId: $incomeId
            day: $day
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
        }
    }`;
