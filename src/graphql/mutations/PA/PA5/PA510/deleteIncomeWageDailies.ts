import gql from "graphql-tag";
export default gql`
mutation deleteIncomeWageDailies( 
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $incomeIds: [Int!]!
    ) {
        deleteIncomeWageDailies( 
            companyId : $companyId
            processKey: $processKey
            incomeIds: $incomeIds
        )
    }`