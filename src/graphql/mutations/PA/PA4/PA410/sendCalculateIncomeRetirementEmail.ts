import gql from "graphql-tag";
export default gql`
    mutation sendCalculateIncomeRetirementEmail(
            $companyId: Int!
            $input: IncomeRetirementCalculationInput!
            $emailInput: SendEmailRequestInput!
        ){
            sendCalculateIncomeRetirementEmail(
                companyId: $companyId, 
                input: $input, 
                emailInput: $emailInput
                )
        }`
