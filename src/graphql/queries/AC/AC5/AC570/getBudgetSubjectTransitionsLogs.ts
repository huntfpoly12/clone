import gql from 'graphql-tag';

export default gql`
    query getBudgetSubjectTransitionsLogs(
        $companyId: Int!,
        $fiscalYear: Int!,
        $facilityBusinessId: Int!,
    ) {
        getBudgetSubjectTransitionsLogs(
            companyId: $companyId,
            fiscalYear: $fiscalYear,
            facilityBusinessId: $facilityBusinessId,
        ) {
            ts
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
            loggedAt
            remark
        }
    }
`
