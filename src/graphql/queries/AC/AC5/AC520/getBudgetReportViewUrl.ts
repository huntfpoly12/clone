import gql from 'graphql-tag';

export default gql`
    query getBudgetReportViewUrl(
        $companyId: Int!,
        $fiscalYear: Int!,
        $facilityBusinessId: Int!,
        $index: Int!,
        $type: Int!,
        $displayCode: Boolean
    ) {
        getBudgetReportViewUrl(
            companyId: $companyId,
            fiscalYear: $fiscalYear,
            facilityBusinessId: $facilityBusinessId,
            index: $index,
            type: $type,
            displayCode: $displayCode
        )
    }
`
