import gql from "graphql-tag";
export default gql`
mutation updateIncomeExtra( 
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $incomeId: Int!
    $input: IncomeExtraUpdateInput!
    ) {
        updateIncomeExtra( 
            companyId : $companyId,
            processKey: $processKey, 
            incomeId: $incomeId,
            input: $input
        ){
            incomeId
        }
}`