import gql from "graphql-tag";
export default gql`
mutation copyIncomeBusinesses( 
    $companyId: Int!
    $source: IncomeProcessKeyInput!
    $target: IncomeProcessKeyInput!
    ) {
        copyIncomeBusinesses( 
            companyId : $companyId,
            source: $source, 
            target: $target,
        ){
            incomeId
        }
}`