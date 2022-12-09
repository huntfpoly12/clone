import gql from "graphql-tag";
export default gql`
    query
    getIncomeBusiness(
            $companyId: Int!  
            $processKey: IncomeProcessKeyInput!
            $incomeId: Int!
        ){
            getIncomeBusiness(companyId: $companyId, processKey: $processKey,incomeId:$incomeId) { 
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