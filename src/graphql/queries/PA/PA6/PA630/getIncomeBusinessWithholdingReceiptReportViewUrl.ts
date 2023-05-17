import gql from "graphql-tag";
export default gql`
    query getIncomeBusinessWithholdingReceiptReportViewUrl(
            $companyId: Int!
            $input: IncomeBusinessWithholdingReceiptInput!
            $employeeIds: [Int!]!
        ){
            getIncomeBusinessWithholdingReceiptReportViewUrl(
                companyId: $companyId, 
                input: $input, 
                employeeIds: $employeeIds
                ) 
        }`