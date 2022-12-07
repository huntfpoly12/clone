import gql from "graphql-tag";
export default gql`
mutation createIncomeExtra( 
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $input: IncomeExtraCreateInput!
    ) {
        createIncomeExtra( 
            companyId : $companyId,
            processKey: $processKey, 
            input: $input,
        ){
            type
        }
}`