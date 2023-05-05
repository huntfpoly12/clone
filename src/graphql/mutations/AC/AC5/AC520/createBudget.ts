import gql from "graphql-tag";
export default gql`
    mutation createBudget(
        $companyId: Int!,
        $fiscalYear: Int!,
        $facilityBusinessId: Int!,
        $index: Int!,
        $type: Int!,
        $accounSubjectOrder: Int!,
        $inputs: [BudgetRecordInput!]!
    ) {
        createBudget(
            companyId: $companyId
            fiscalYear: $fiscalYear
            facilityBusinessId: $facilityBusinessId
            index: $index
            type: $type
            accounSubjectOrder: $accounSubjectOrder
            inputs: $inputs
        ) {
            index
            accounSubjectOrder
            type
            records {
                code
                code1
                code2
                code3
                amount
                remark
                fundingSource1
                fundingSource2
                fundingSource3
                fundingSource4
                details {
                    type
                    detail
                    calculationResult
                }
            }
        }
    }
`;
