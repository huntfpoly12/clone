import gql from "graphql-tag";
export default gql`
mutation copyIncomeBusinesses( 
    $companyId: Int!
    $source: IncomeProcessKeyInput!
    $target: IncomeProcessKeyInput!
    $targetDay: Int!
    ) {
        copyIncomeBusinesses( 
            companyId : $companyId,
            source: $source, 
            target: $target,
            targetDay: $targetDay,
        ){
            incomeId
        }
}`