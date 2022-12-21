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
                        }
                        prevRetiredYearsOfService {
                            settlementStartDate
                            settlementFinishDate
                            paymentDate
                            exclusionDays
                            additionalDays
                        }
                        lastRetiredYearsOfService {
                            settlementStartDate
                            settlementFinishDate
                            paymentDate
                            exclusionDays
                            additionalDays
                        }
                        prevRetirementBenefitStatus {
                            retirementBenefits
                            nonTaxableRetirementBenefits
                            taxableRetirementBenefits
                        }
                        settlementRetiredYearsOfService {
                            settlementStartDate
                            settlementFinishDate
                            paymentDate
                            exclusionDays
                            additionalDays
                        }
                        taxAmountCalculation {
                            taxCredit
                            prePaidDelayedTaxPaymentTaxAmount
                            convertedTaxAmount
                            taxAmountCalculatedForRetirementIncome 
                            prePaidDelayedTaxPaymentTaxAmount
                            taxAmountSubjectToReporting
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
                            }
                        }
                        taxBaseCalculation {
                            retirementIncome
                            deductionForYearsOfService
                            conversionBenefit
                            taxBaseForRetirementIncome
                            deductionByConversionBenefit
                          
                        }
                        deductibleWithholdingTax{
                            incomeTax
                            localIncomeTax
                        }
                        taxAmountToBeReported {
                            incomeTax
                            localIncomeTax
                        }
                        retirementIncomeTax {
                            incomeTax
                            localIncomeTax
                        }
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
              
            }
        }`