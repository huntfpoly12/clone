import gql from "graphql-tag";
export default gql`
mutation UpdateIncomeRetirement($companyId: Int!, $processKey: IncomeProcessKeyInput!, $incomeId: Int!, $input: IncomeRetirementUpdateInput!, $incomeCalculationInput: IncomeRetirementCalculationInput!, $taxCalculationInput: IncomeRetirementTaxCalculationInput!) {
    updateIncomeRetirement(companyId: $companyId, processKey: $processKey, incomeId: $incomeId, input: $input, incomeCalculationInput: $incomeCalculationInput, taxCalculationInput: $taxCalculationInput) {
      incomeId
    }
  }
  `