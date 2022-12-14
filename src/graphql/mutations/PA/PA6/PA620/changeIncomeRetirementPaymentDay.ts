import gql from "graphql-tag";
export default gql`
mutation changeIncomeRetirementPaymentDay( 
    $companyId: Int!
    $processKey: IncomeProcessKeyInput! 
    $incomeId: Int!
    $day: Int!
    ) {
        changeIncomeRetirementPaymentDay( 
            companyId : $companyId,
            incomeId: $incomeId, 
            processKey: $processKey,
            day: $day, 
        ){
            incomeId
        }
}`