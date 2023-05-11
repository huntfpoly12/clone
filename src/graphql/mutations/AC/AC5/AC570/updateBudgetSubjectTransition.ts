import gql from "graphql-tag";
export default gql`
    mutation updateBudgetSubjectTransition(
        $companyId: Int!,
        $fiscalYear: Int!,
        $facilityBusinessId: Int!,
        $transitionId: Int!,
        $input: BudgetSubjectTransitionUpdateInput!
    ) {
        updateBudgetSubjectTransition(
            companyId: $companyId
            fiscalYear: $fiscalYear
            facilityBusinessId: $facilityBusinessId
            transitionId: $transitionId
            input: $input
        ) {
            transitionId
            transitionDate
            transitionAmount
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
`;
