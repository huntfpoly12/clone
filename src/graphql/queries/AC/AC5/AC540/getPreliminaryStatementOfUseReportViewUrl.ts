import gql from 'graphql-tag';

export default gql`
    query getPreliminaryStatementOfUseReportViewUrl(
        $companyId: Int!,
        $fiscalYear: Int!,
        $facilityBusinessId: Int!,
        $startYearMonth: Int!,
        $finishYearMonth: Int!,
        $type: Int!,
        $displayClient: Boolean,
        $displayBankbookSummary: Boolean,
        $displayResolutionNumber: Boolean
    ) {
        getPreliminaryStatementOfUseReportViewUrl(
            companyId: $companyId,
            fiscalYear: $fiscalYear,
            facilityBusinessId: $facilityBusinessId,
            startYearMonth: $startYearMonth,
            finishYearMonth: $finishYearMonth,
            type: $type,
            displayClient: $displayClient,
            displayBankbookSummary: $displayBankbookSummary,
            displayResolutionNumber: $displayResolutionNumber
        )
    }
`
