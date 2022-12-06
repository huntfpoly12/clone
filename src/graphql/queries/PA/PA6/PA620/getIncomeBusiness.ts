import gql from "graphql-tag";
export default gql`
    query
    getIncomeBusiness(
            $companyId: Int! 
            $incomeId: Int!
            $processKey: IncomeProcessKeyInput!
        ){
            getIncomeBusiness(companyId: $companyId, processKey: $processKey, incomeId:$incomeId) { 
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
                paymentAmount
                taxRate
                actualPayment
            }
        }`