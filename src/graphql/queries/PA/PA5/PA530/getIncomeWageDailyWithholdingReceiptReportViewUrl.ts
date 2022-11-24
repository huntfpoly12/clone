import gql from "graphql-tag";
export default gql`
query
getIncomeWageDailyWithholdingReceiptReportViewUrl( 
    $companyId: Int!
    $input: IncomeWageDailyWithholdingReceiptInput!
    $employeeIds: [Int!]! 
    ) {
        getIncomeWageDailyWithholdingReceiptReportViewUrl( 
            companyId : $companyId,
            input: $input, 
            employeeIds: $employeeIds, 
        ) 
    }`