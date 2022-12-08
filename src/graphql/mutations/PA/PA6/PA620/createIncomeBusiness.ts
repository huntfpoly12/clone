import gql from "graphql-tag";
export default gql`
mutation createIncomeBusiness( 
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $input: IncomeBusinessCreateInput!
    ) {
        createIncomeBusiness( 
            companyId : $companyId,
            processKey: $processKey, 
            input: $input,
        ){
            incomeId
        }
}`