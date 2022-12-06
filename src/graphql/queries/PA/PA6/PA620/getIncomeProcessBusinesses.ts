import gql from "graphql-tag";
export default gql`
    query getIncomeProcessBusinesses(
            $companyId: Int!
            $imputedYear: Int!
            $imputedMonth: Int
        ){
            getIncomeProcessBusinesses(companyId: $companyId, imputedYear: $imputedYear,imputedMonth:$imputedMonth) { 
                companyId
                imputedMonth
                imputedYear
                status
                paymentYear
                paymentMonth
                employeeStat{
                    employeeCount
                }
                incomeStat{
                    incomePayment
                    withholdingIncomeTax
                    withholdingLocalIncomeTax
                    actualPayment
                }
            }
        }`