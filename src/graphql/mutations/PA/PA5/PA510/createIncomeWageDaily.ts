import gql from "graphql-tag";
export default gql`
mutation createIncomeWageDaily( 
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $input: IncomeWageDailyCreateInput!
    ) {
        createIncomeWageDaily( 
            companyId: $companyId
            processKey: $processKey
            input: $input
        ) {
            incomeId
        }
    }`