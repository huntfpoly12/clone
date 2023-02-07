import gql from "graphql-tag";
export default gql`
    query getTaxWithholdingStatusReportsLogs(
        $companyId: Int!
        $imputedYear: Int!
    ) {
        getTaxWithholdingStatusReportsLogs(companyId: $companyId, imputedYear: $imputedYear) {
            imputedYear
            reportId
            ts
            imputedMonth
            paymentYear
            paymentMonth
            reportType
            index
            status
            statusUpdatedAt
            paymentType
            yearEndTaxAdjustment
            additionalIncome
            refund
            afterDeadline
            submissionDate
            imputedStartYearMonth
            imputedFinishYearMonth
            paymentStartYearMonth
            paymentFinishYearMonth
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
            reportClassCode
            detailId
            refundApplicationId
            prePaymentTaxStatementId
            createdAt
            createdBy
            updatedAt
            updatedBy
            ip
            active
            loggedAt
            remark
        }
    }
`;
