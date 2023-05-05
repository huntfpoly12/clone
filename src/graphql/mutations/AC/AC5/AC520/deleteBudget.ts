import gql from "graphql-tag";
export default gql`
    mutation deleteBudget(
        $companyId: Int!,
        $fiscalYear: Int!,
        $facilityBusinessId: Int!,
        $index: Int!,
    ) {
        deleteBudget(
            companyId: $companyId
            fiscalYear: $fiscalYear
            facilityBusinessId: $facilityBusinessId
            index: $index
        )
    }
`;
