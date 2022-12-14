import gql from "graphql-tag";
export default gql`
mutation deleteIncomeRetirements( 
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $incomeIds: [Int!]! 
    ) {
        deleteIncomeRetirements( 
            companyId : $companyId,
            processKey: $processKey, 
            incomeIds: $incomeIds, 
        )
}`