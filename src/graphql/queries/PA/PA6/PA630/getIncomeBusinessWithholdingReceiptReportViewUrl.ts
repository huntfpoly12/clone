import gql from "graphql-tag";
export default gql`
    query getIncomeBusinessWithholdingReceiptReportViewUrl(
            $companyId: Int!
            $input: IncomeBusinessWithholdingReceiptInput!
            $employeeKeys: [ReportEmployeeBusinessKeyInput!]!
        ){
            getIncomeBusinessWithholdingReceiptReportViewUrl(companyId: $companyId, input: $input, employeeKeys: $employeeKeys) { 
                scalar
            }
        }`