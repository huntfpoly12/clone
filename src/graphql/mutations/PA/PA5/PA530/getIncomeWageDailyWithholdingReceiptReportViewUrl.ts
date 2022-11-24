import gql from "graphql-tag";
export default gql`
mutation getIncomeWageDailyWithholdingReceiptReportViewUrl( 
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