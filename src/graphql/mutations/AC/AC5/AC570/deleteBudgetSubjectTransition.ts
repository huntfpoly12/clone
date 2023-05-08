import gql from "graphql-tag";
export default gql`
    mutation deleteBudgetSubjectTransition(
        $companyId: Int!,
        $fiscalYear: Int!,
        $facilityBusinessId: Int!,
        $transitionId: Int!,
    ) {
        deleteBudgetSubjectTransition(
            companyId: $companyId
            fiscalYear: $fiscalYear
            facilityBusinessId: $facilityBusinessId
            transitionId: $transitionId
        )
    }
`;
