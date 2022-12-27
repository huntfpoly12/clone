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
                    residentId 
                    retirementIncome
                    weeklyWorkingHours
                    monthlyPaycheck
                    workingDays
                    dailyWage
                    monthlyWage
                    totalDeduction
                    deletable 
                    nationalPensionDeduction
                    healthInsuranceDeduction
                    employeementInsuranceDeduction
                    nationalPensionSupportPercent
                    employeementInsuranceSupportPercent 
                }
            }
        }`