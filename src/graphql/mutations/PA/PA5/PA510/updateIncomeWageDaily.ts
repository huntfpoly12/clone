import gql from "graphql-tag";
export default gql`
mutation updateIncomeWageDaily( 
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $incomeId: Int!
    $input: IncomeWageDailyUpdateInput!
    ) {
        updateIncomeWageDaily( 
            companyId : $companyId
            processKey: $processKey
            incomeId: $incomeId
            input: $input
        ) {
            incomeId
        }
    }`