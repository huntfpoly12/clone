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
                        name
                        employeeId
                        residentId
                        status
                        foreigner
                        nationalPensionDeduction
                        healthInsuranceDeduction
                        employeementInsuranceDeduction
                        nationalPensionSupportPercent
                        employeementInsuranceSupportPercent
                        employeementReductionRatePercent
                        incomeTaxMagnification
                    }
                    ... on EmployeeWageDaily{
                        joinedAt
                        leavedAt
                        monthlyWage
                        name
                        residentId
                        status
                        foreigner
                        nationalPensionDeduction
                        healthInsuranceDeduction
                        employeementInsuranceDeduction
                        nationalPensionSupportPercent
                        employeementInsuranceSupportPercent 
                    }
                }
                retirementType 
                retirementBenefits
                nonTaxableRetirementBenefits
                taxableRetirementBenefits
                totalDeduction
            }
        }`