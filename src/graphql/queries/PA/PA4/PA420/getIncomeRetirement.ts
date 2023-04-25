import gql from "graphql-tag";
export default gql`
    query
    getIncomeRetirement(
        $companyId: Int!
        $processKey: IncomeProcessKeyInput!
        $incomeId: Int!
    ){
        getIncomeRetirement(companyId: $companyId, processKey: $processKey, incomeId:$incomeId) {
            incomeId
            paymentDay
            retirementType
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
                    retirementIncome
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
            totalDeduction
            specification {
                executive
                retirementReason
                specificationDetail {
                    lastRetirementBenefitStatus{
                        retirementBenefits
                        nonTaxableRetirementBenefits
                        taxableRetirementBenefits
                        __typename @skip(if: true)
                    }
                    prevRetiredYearsOfService {
                        settlementStartDate
                        settlementFinishDate
                        paymentDate
                        exclusionDays
                        additionalDays
                        __typename @skip(if: true)
                    }
                    lastRetiredYearsOfService {
                        settlementStartDate
                        settlementFinishDate
                        paymentDate
                        exclusionDays
                        additionalDays
                        __typename @skip(if: true)
                    }
                    prevRetirementBenefitStatus {
                        retirementBenefits
                        nonTaxableRetirementBenefits
                        taxableRetirementBenefits
                        __typename @skip(if: true)
                    }
                    settlementRetiredYearsOfService {
                        settlementStartDate
                        settlementFinishDate
                        paymentDate
                        exclusionDays
                        additionalDays
                        __typename @skip(if: true)
                    }
                    taxAmountCalculation {
                        taxCredit
                        prePaidDelayedTaxPaymentTaxAmount
                        convertedTaxAmount
                        taxAmountCalculatedForRetirementIncome
                        prePaidDelayedTaxPaymentTaxAmount
                        taxAmountSubjectToReporting
                        __typename @skip(if: true)
                    }
                    calculationOfDeferredRetirementIncomeTax{
                        totalAmount
                        retirementIncomeTax
                        statements{
                            pensionAccountHolder
                            bizNumber
                            bankAccountNumber
                            depositDate
                            accountDepositAmount
                            __typename @skip(if: true)
                        }
                        __typename @skip(if: true)
                    }
                    taxBaseCalculation {
                        retirementIncome
                        deductionForYearsOfService
                        conversionBenefit
                        taxBaseForRetirementIncome
                        deductionByConversionBenefit
                        __typename @skip(if: true)
                    }
                    deductibleWithholdingTax{
                        incomeTax
                        localIncomeTax
                        __typename @skip(if: true)
                    }
                    taxAmountToBeReported {
                        incomeTax
                        localIncomeTax
                        __typename @skip(if: true)
                    }
                    retirementIncomeTax {
                        incomeTax
                        localIncomeTax
                        __typename @skip(if: true)
                    }
                    __typename @skip(if: true)
                }
                totalPay3Month
                totalAnualBonus
                annualLeaveAllowance
                expectedRetirementBenefits
                definedRetirementBenefits
                nonTaxableRetirementBenefits
                taxableRetirementBenefits
            }
            imputedMonth
            paymentYear
            paymentMonth
            __typename @skip(if: true)
        }
    }`
