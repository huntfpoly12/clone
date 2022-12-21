import gql from "graphql-tag";
export default gql`
mutation changeIncomeProcessRetirementStatus( 
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $status: ProcessStatusScalar!
    ) {
        changeIncomeProcessRetirementStatus( 
            companyId: $companyId
            processKey: $processKey
            status: $status
        ) {
            companyId
            type
            imputedYear
            imputedMonth
            paymentYear
            paymentMonth
            status
            statusUserId
            statusUpdatedAt
            createdAt
            createdBy
            updatedAt
            updatedBy
            ip
            active
            statusUpdateUser {
                id
                type
                username
                name
                active
            }
            employeeStat {
                type
                imputedYear
                imputedMonth
                paymentYear
                paymentMonth
                employeeCount
                retireEmployeeCount
            }
            incomeStat {
                imputedYear
                imputedMonth
                paymentYear
                paymentMonth
                incomePayment
                withholdingIncomeTax
                withholdingLocalIncomeTax
                withholdingRuralSpecialTax
                retirementBenefits
                nonTaxableRetirementBenefits
                taxableRetirementBenefits
            }
        }
    }`;
