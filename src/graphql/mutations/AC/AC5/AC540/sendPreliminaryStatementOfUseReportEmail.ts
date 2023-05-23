import gql from "graphql-tag";
export default gql`
    mutation sendPreliminaryStatementOfUseReportEmail(
        $companyId: Int!
        $fiscalYear: Int!
        $facilityBusinessId: Int!
        $startYearMonth: Int!
        $finishYearMonth: Int!
        $type: Int!
        $displayClient: Boolean
        $displayBankbookSummary: Boolean
        $displayResolutionNumber: Boolean
        $emailInput: SendEmailRequestInput!
    ) {
        sendPreliminaryStatementOfUseReportEmail(
            companyId: $companyId
            fiscalYear: $fiscalYear
            facilityBusinessId: $facilityBusinessId
            startYearMonth: $startYearMonth
            finishYearMonth: $finishYearMonth
            type: $type
            displayClient: $displayClient
            displayBankbookSummary: $displayBankbookSummary
            displayResolutionNumber: $displayResolutionNumber
            emailInput: $emailInput
        )
    }
`;
