import gql from 'graphql-tag';

export default gql`
    query getBudgetSummaryTableReportViewUrl(
        $companyId: Int!,
        $fiscalYear: Int!,
        $facilityBusinessId: Int!,
        $index: Int!,
    ) {
        getBudgetSummaryTableReportViewUrl(
            companyId: $companyId,
            fiscalYear: $fiscalYear,
            facilityBusinessId: $facilityBusinessId,
            index: $index,
        )
    }
`
