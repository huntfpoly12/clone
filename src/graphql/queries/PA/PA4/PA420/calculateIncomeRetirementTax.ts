import gql from "graphql-tag";
export default gql`
    query
    calculateIncomeRetirementTax(
            $companyId: Int!  
            $input: IncomeRetirementTaxCalculationInput!
        ){
            calculateIncomeRetirementTax(companyId: $companyId, input: $input) { 
                prevRetirementBenefitStatus: {
                    retirementBenefits
                    nonTaxableRetirementBenefits
                    taxableRetirementBenefits
                }
                lastRetirementBenefitStatus: {
                    retirementBenefits
                    nonTaxableRetirementBenefits
                    taxableRetirementBenefits
                }
                settlementRetirementBenefitStatus: {
                    retirementBenefits
                    nonTaxableRetirementBenefits
                    taxableRetirementBenefits
                }
                prevRetiredYearsOfService: {
                    settlementStartDate
                    settlementFinishDate
                    paymentDate
                    exclusionDays
                    additionalDays
                }
                lastRetiredYearsOfService: {
                    settlementStartDate
                    settlementFinishDate
                    paymentDate
                    exclusionDays
                    additionalDays
                }
                settlementRetiredYearsOfService: {
                    settlementStartDate
                    settlementFinishDate
                    paymentDate
                    exclusionDays
                    additionalDays
                }
                taxBaseCalculation: {
                    retirementIncome
                    deductionForYearsOfService
                    conversionBenefit
                    deductionByConversionBenefit
                    taxBaseForRetirementIncome
                }
                taxAmountCalculation: {
                    convertedTaxAmount
                    taxAmountCalculatedForRetirementIncome
                    taxCredit
                    prePaidDelayedTaxPaymentTaxAmount
                    taxAmountSubjectToReporting
                }
                calculationOfDeferredRetirementIncomeTax: {
                    totalAmount
                    statements: {
                        pensionAccountHolder
                        bizNumber
                        bankAccountNumber
                        depositDate
                        accountDepositAmount
                    }
                    retirementIncomeTax
                }
                taxAmountToBeReported: {
                    incomeTax
                    localIncomeTax
                }
                retirementIncomeTax: {
                    incomeTax
                    localIncomeTax
                }
                deductibleWithholdingTax: {
                    incomeTax
                    localIncomeTax
                }
            }
        }`;
