import gql from "graphql-tag";
export default gql`
    mutation sendIncomeBusinessWithholdingReceiptReportEmail(
            $companyId: Int!
            $input: IncomeBusinessWithholdingReceiptInput!
            $employeeInputs: [EmployeeBusinessSendEmailRequestInput!]!
        ){
            sendIncomeBusinessWithholdingReceiptReportEmail(
                companyId: $companyId, 
                input: $input, 
                employeeInputs: $employeeInputs
                )
        }`