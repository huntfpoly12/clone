import gql from 'graphql-tag';

export default gql`
    query getBudgetSubjectTransitionReportViewUrl(
        $companyId: Int!,
        $fiscalYear: Int!,
        $facilityBusinessId: Int!,
        $transitionId: Int!,
    ) {
        getBudgetSubjectTransitionReportViewUrl(
            companyId: $companyId,
            fiscalYear: $fiscalYear,
            facilityBusinessId: $facilityBusinessId,
            transitionId: $transitionId,
        ) 
    }
`
