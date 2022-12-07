import gql from "graphql-tag";
export default gql`
mutation deleteIncomeExtras( 
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $incomeIds: [Int!]!
    ) {
        deleteIncomeExtras( 
            companyId : $companyId,
            processKey: $processKey, 
            incomeIds: $incomeIds,
        )
}`