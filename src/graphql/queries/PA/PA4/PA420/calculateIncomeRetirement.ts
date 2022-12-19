import gql from "graphql-tag";
export default gql`
    query
    calculateIncomeRetirement(
            $companyId: Int!  
            $input: IncomeRetirementCalculationInput! 
        ){
            calculateIncomeRetirement(companyId: $companyId, input: $input)  
        }`