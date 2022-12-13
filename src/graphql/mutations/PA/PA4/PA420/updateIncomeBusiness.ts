import gql from "graphql-tag";
export default gql`
mutation updateIncomeBusiness( 
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $input: IncomeBusinessUpdateInput!
    $incomeId : Int!
    ) {
        updateIncomeBusiness( 
            companyId : $companyId,
            processKey: $processKey, 
            input: $input,
            incomeId : $incomeId
        ){
            incomeId
        }
}`