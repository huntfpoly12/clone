import gql from "graphql-tag";
export default gql`
mutation deleteIncomeBusinesses( 
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $incomeIds: [Int!]! 
    ) {
        deleteIncomeBusinesses( 
            companyId : $companyId,
            processKey: $processKey, 
            incomeIds: $incomeIds, 
        )
}`