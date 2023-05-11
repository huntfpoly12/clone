import gql from 'graphql-tag';

export default gql`
    query getBudgetSubjectTransitions(
        $companyId: Int!,
        $fiscalYear: Int!,
        $facilityBusinessId: Int!,
    ) {
        getBudgetSubjectTransitions(
            companyId: $companyId,
            fiscalYear: $fiscalYear,
            facilityBusinessId: $facilityBusinessId,
        ) {
            transitionId
            transitionDate
            transitionAmount
            bugetIndex
            accounSubjectOrder
            sourceCode
            sourceBudgetAmount
            sourceExpenditureAmount
            transitionCode
            transitionBudgetAmount
            transitionExpenditureAmount
            savedAt
            savedBy
            transitionCause
            createdAt
            createdBy
            updatedAt
            updatedBy
            ip
            active
        }
    }
`
