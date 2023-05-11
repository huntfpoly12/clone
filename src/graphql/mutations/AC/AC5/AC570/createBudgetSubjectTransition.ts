import gql from "graphql-tag";
export default gql`
    mutation createBudgetSubjectTransition(
        $companyId: Int!,
        $fiscalYear: Int!,
        $facilityBusinessId: Int!,
        $input: BudgetSubjectTransitionCreateInput!
    ) {
        createBudgetSubjectTransition(
            companyId: $companyId
            fiscalYear: $fiscalYear
            facilityBusinessId: $facilityBusinessId
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
