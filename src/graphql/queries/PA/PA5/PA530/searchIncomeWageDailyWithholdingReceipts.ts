import gql from "graphql-tag";
export default gql`
    query searchIncomeWageDailyWithholdingReceipts(
            $companyId: Int!
            $filter: IncomeWageDailyWithholdingReceiptSearchFilter!
        ){
            searchIncomeWageDailyWithholdingReceipts(companyId: $companyId, filter: $filter) { 
                totalTaxPay
                totalTaxfreePay
                withholdingIncomeTax
                withholdingLocalIncomeTax
                employee {
                    type 
                    employeeId 
                    incomeTypeCode
                    name
                    foreigner
                    nationality
                    nationalityCode
                    stayQualification
                    residentIdValidity
                    roadAddress
                    addressExtend
                    email
                    department
                    responsibility
                    status
                    withholdingIncomeTax
                    withholdingLocalIncomeTax
                    withholdingRuralSpecialTax
                    createdAt
                    createdBy
                    updatedAt
                    updatedBy
                    ip
                    active
                    residentId
                    joinedAt
                    leavedAt
                    retirementIncome
                    weeklyWorkingHours
                    monthlyPaycheck
                    workingDays
                    dailyWage
                    monthlyWage
                    totalDeduction
                    deletable 
                }
            }
        }`