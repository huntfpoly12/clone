import gql from "graphql-tag";
export default gql`
  query getTaxWithholdingStatusReports(
    $companyId: Int!
    $imputedYear: Int!
  ) {
        getTaxWithholdingStatusReports( companyId: $companyId, imputedYear: $imputedYear ) {
            companyId
            imputedYear
            reportId
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
            company {
                id
                code
                name
                bizNumber
                bizType
                address
                phone
                presidentName
                presidentMobilePhone
                createdAt
                createdBy
                updatedAt
                updatedBy
                ip
                active
                residentId
            }
            detail {
                header {
                    withholdingDutyName
                    withholdingDutyPresidentName
                    withholdingDutyBizNumber
                    withholdingDutyAddress
                    withholdingDutyCollectivePayment
                    withholdingDutyTaxForEachBusiness
                    withholdingDutyTelephone
                    withholdingDutyEmail
                    taxAgentName
                    taxAgentBizNumber
                    taxAgentTelephone
                    nationalTaxRefundBankCode
                    nationalTaxRefundBankAccountNumber
                }
                statementAndAmountOfTaxPaids {
                    code
                    numberOfPeople
                    numberOfPeopleModified
                    totalPayment
                    totalPaymentModified
                    collectedIncomeTax
                    collectedIncomeTaxModified
                    collectedRuralSpecialTax
                    collectedRuralSpecialTaxModified
                    collectedExtraTax
                    collectedExtraTaxModified
                    thisMonthAdjustedRefundTaxAmount
                    thisMonthAdjustedRefundTaxAmountModified
                    incomeTaxPaid
                    incomeTaxPaidModified
                    ruralSpecialTaxPaid
                    ruralSpecialTaxPaidModified
                }
                adjustmentOfRefundTaxAmount {
                    prevMonthNonRefundableTaxAmount
                    prevMonthNonRefundableTaxAmountModified
                    preRefundApplicationTaxAmount
                    preRefundApplicationTaxAmountModified
                    deductibleBalance
                    deductibleBalanceModified
                    thisMonthRefundTaxGeneral
                    thisMonthRefundTaxGeneralModified
                    thisMonthRefundTaxFiduciaryEstates
                    thisMonthRefundTaxFiduciaryEstatesModified
                    thisMonthRefundTaxOtherFinancialCompany
                    thisMonthRefundTaxOtherFinancialCompanyModified
                    thisMonthRefundTaxOtherMerge
                    thisMonthRefundTaxOtherMergeModified
                    refundTaxSubjectToAdjustment
                    refundTaxSubjectToAdjustmentModified
                    thisMonthTotalAdjustedRefundTaxAmount
                    thisMonthTotalAdjustedRefundTaxAmountModified
                    nextMonthRefundTaxAmount
                    nextMonthRefundTaxAmountModified
                    refundApplicationAmount
                    refundApplicationAmountModified
                }
                createdAt
                createdBy
                updatedAt
                updatedBy
                ip
                active
            }
        }
    }
`;
