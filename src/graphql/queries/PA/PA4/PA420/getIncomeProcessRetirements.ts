import gql from "graphql-tag";
export default gql`
    query getIncomeProcessRetirements(
            $companyId: Int!
            $imputedYear: Int!
            $imputedMonth: Int
        ){
            getIncomeProcessRetirements(companyId: $companyId, imputedYear: $imputedYear,imputedMonth:$imputedMonth) { 
                companyId
                imputedMonth
                imputedYear
                status
                paymentYear
                paymentMonth
                employeeStat{
                    retireEmployeeCount
                    employeeCount
                }
                incomeStat{ 
                    incomePayment
                    nonTaxableRetirementBenefits
                    taxableRetirementBenefits
                    retirementBenefits
                    withholdingIncomeTax
                    withholdingLocalIncomeTax 
                }
            }
        }`