import gql from "graphql-tag";
export default gql`
    query
    getIncomeRetirements(
            $companyId: Int!  
            $processKey: IncomeProcessKeyInput!
        ){
            getIncomeRetirements(companyId: $companyId, processKey: $processKey) { 
                incomeId
                paymentDay
                employeeType
                employeeId
                incomeTypeCode
                createdAt
                incomePayment
                withholdingIncomeTax
                withholdingLocalIncomeTax
                withholdingRuralSpecialTax
                prevPaymentDay  
                actualPayment
                employee{
                ... on EmployeeWage{
                    joinedAt
                            leavedAt
                    totalPay
                }
                ... on EmployeeWageDaily{
                    joinedAt
                            leavedAt
                    monthlyWage
                }
                }
                retirementType 
                retirementBenefits
                nonTaxableRetirementBenefits
                taxableRetirementBenefits
                totalDeduction
            }
        }`