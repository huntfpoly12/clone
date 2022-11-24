import gql from "graphql-tag";
export default gql`
mutation sendIncomeWageDailyWithholdingReceiptReportEmail( 
    $companyId: Int!
    $input: IncomeWageDailyWithholdingReceiptInput!
    $employeeInputs: [EmployeeSendEmailRequestInput!]! 
    ) {
        sendIncomeWageDailyWithholdingReceiptReportEmail( 
            companyId : $companyId,
            input: $input, 
            employeeInputs: $employeeInputs, 
        ) 
    }`