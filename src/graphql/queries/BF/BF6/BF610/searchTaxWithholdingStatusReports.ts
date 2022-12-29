import gql from "graphql-tag";
export default gql`
    query
    searchTaxWithholdingStatusReports(
            $filter: TaxWithholdingStatusReportSearchFilter! 
        ){
            searchTaxWithholdingStatusReports(filter: $filter) { 
                totalCount
                page
                rows
                datas {
                    company{
                    code
                    name
                    address
                    }
                    companyId
                    status
                    imputedYear
                    imputedMonth
                    paymentYear
                    paymentMonth
                    reportType
                    afterDeadline
                    yearEndTaxAdjustment
                    refund
                    wageIncomeSimplified
                    yearEndAdjustmentRetirement
                    dailyWageIncome
                    yearEndAdjustment
                    retirementIncome
                    businessIncome
                    extraIncome
                    totalPayment
                    totalCollectedTaxAmount
                    nextMonthRefundTaxAmount
                    refundApplicationAmount
                }
            }
        }`