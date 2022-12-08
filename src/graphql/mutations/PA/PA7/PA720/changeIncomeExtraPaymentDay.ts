import gql from "graphql-tag";
export default gql`
mutation changeIncomeExtraPaymentDay( 
    $companyId: Int!
    $processKey: IncomeProcessKeyInput!
    $incomeId: Int!
    $day: Int!
    ) {
        changeIncomeExtraPaymentDay( 
            companyId : $companyId,
            processKey: $processKey, 
            incomeId: $incomeId,
            day: $day
        ){
            incomeId
        }
}`