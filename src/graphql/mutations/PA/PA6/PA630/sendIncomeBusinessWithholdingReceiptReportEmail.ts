import gql from "graphql-tag";
export default gql`
    query sendIncomeBusinessWithholdingReceiptReportEmail(
            $companyId: Int!
            $input: IncomeBusinessWithholdingReceiptInput!
            $employeeInputs: [EmployeeBusinessSendEmailRequestInput!]!
        ){
            sendIncomeBusinessWithholdingReceiptReportEmail(companyId: $companyId, input: $input, employeeInputs: $employeeInputs) { 
                scalar
            }
        }`