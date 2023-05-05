import gql from "graphql-tag";
export default gql`
    mutation changeBudgetStatus(
        $companyId: Int!,
        $fiscalYear: Int!,
        $facilityBusinessId: Int!,
        $index: Int!,
    ) {
        changeBudgetStatus(
            companyId: $companyId
            fiscalYear: $fiscalYear
            facilityBusinessId: $facilityBusinessId
            index: $index
        )
    }
`;
