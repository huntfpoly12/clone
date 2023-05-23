import gql from 'graphql-tag';

export default gql`
    query getCostStatementReportViewUrl(
        $companyId: Int!,
        $fiscalYear: Int!,
        $facilityBusinessId: Int!,
        $startYearMonth: Int!,
        $finishYearMonth: Int!,
        $type: Int!,
        $displayMonthlySummary: Boolean
    ) {
        getCostStatementReportViewUrl(
            companyId: $companyId,
            fiscalYear: $fiscalYear,
            facilityBusinessId: $facilityBusinessId,
            startYearMonth: $startYearMonth,
            finishYearMonth: $finishYearMonth,
            type: $type,
            displayMonthlySummary: $displayMonthlySummary
        )
    }
`
