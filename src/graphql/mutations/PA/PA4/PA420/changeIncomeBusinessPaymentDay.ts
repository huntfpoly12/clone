import gql from "graphql-tag";
export default gql`
mutation changeIncomeBusinessPaymentDay( 
    $companyId: Int!
    $processKey: IncomeProcessKeyInput! 
    $incomeId: Int!
    $day: Int!
    ) {
        changeIncomeBusinessPaymentDay( 
            companyId : $companyId,
            incomeId: $incomeId, 
            processKey: $processKey,
            day: $day, 
        ){
            incomeId
        }
}`