import gql from "graphql-tag";
export default gql`
    query
    getIncomeBusinesses(
            $companyId: Int!  
            $processKey: IncomeProcessKeyInput!
        ){
            getIncomeBusinesses(companyId: $companyId, processKey: $processKey) { 
                incomeId
                paymentDay
                employeeType
                employeeId
                incomeTypeCode
                incomePayment
                withholdingIncomeTax
                withholdingLocalIncomeTax
                withholdingRuralSpecialTax
                prevPaymentDay 
                paymentAmount
                taxRate
                actualPayment
                employee{
                    name
                    incomeTypeName 
                }
            }
        }`