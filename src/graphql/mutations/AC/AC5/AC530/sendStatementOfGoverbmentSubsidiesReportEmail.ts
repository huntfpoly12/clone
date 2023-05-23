import gql from "graphql-tag";
export default gql`
    mutation sendStatementOfGoverbmentSubsidiesReportEmail(
        $companyId: Int!
        $fiscalYear: Int!
        $facilityBusinessId: Int!
        $startYearMonth: Int!
        $finishYearMonth: Int!
        $type: Int!
        $displayClient: Boolean
        $displayBankbookSummary: Boolean
        $emailInput: SendEmailRequestInput!
    ) {
        sendStatementOfGoverbmentSubsidiesReportEmail(
            companyId: $companyId
            fiscalYear: $fiscalYear
            facilityBusinessId: $facilityBusinessId
            startYearMonth: $startYearMonth
            finishYearMonth: $finishYearMonth
            type: $type
            displayClient: $displayClient
            displayBankbookSummary: $displayBankbookSummary
            emailInput: $emailInput
        )
    }
`;
