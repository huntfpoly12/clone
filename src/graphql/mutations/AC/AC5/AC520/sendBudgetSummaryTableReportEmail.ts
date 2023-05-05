import gql from "graphql-tag";
export default gql`
    mutation sendBudgetSummaryTableReportEmail(
        $companyId: Int!,
        $fiscalYear: Int!,
        $facilityBusinessId: Int!,
        $index: Int!,
        $emailInput: SendEmailRequestInput!,
    ) {
        sendBudgetSummaryTableReportEmail(
            companyId: $companyId
            fiscalYear: $fiscalYear
            facilityBusinessId: $facilityBusinessId
            index: $index
            emailInput: $emailInput
        )
    }
`;
