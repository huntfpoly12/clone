import gql from "graphql-tag";
export default gql`
    mutation sendCostStatementReportEmail(
        $companyId: Int!
        $fiscalYear: Int!
        $facilityBusinessId: Int!
        $startYearMonth: Int!
        $finishYearMonth: Int!
        $type: Int!
        $displayMonthlySummary: Boolean
        $emailInput: SendEmailRequestInput!
    ) {
        sendCostStatementReportEmail(
            companyId: $companyId
            fiscalYear: $fiscalYear
            facilityBusinessId: $facilityBusinessId
            startYearMonth: $startYearMonth
            finishYearMonth: $finishYearMonth
            type: $type
            displayMonthlySummary: $displayMonthlySummary
            emailInput: $emailInput
        )
    }
`;
