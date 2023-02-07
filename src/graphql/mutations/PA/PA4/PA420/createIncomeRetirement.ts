import gql from "graphql-tag";
export default gql`
mutation createIncomeRetirement( 
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $input: IncomeRetirementCreateInput!
    $incomeCalculationInput: IncomeRetirementCalculationInput!
    $taxCalculationInput: IncomeRetirementTaxCalculationInput!
    ) {
        createIncomeRetirement( 
            companyId : $companyId,
            processKey: $processKey, 
            input: $input,
            incomeCalculationInput: $incomeCalculationInput,
            taxCalculationInput: $taxCalculationInput
        ){
            incomeId
        }
}`