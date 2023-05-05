import gql from "graphql-tag";
export default gql`
    mutation saveEmployeePayTable(
        $companyId: Int!,
        $fiscalYear: Int!,
        $facilityBusinessId: Int!,
        $index: Int!,
        $accounSubjectOrder: Int!,
        $totalLaborCost: Float,
        $totalDirectLaborCost: Float,
        $totalIndirectLaborCost: Float,
        $inputs: [EmployeePayTableRecordInput!]
    ) {
        saveEmployeePayTable(
            companyId: $companyId
            fiscalYear: $fiscalYear
            facilityBusinessId: $facilityBusinessId
            index: $index
            inputs: $inputs
            accounSubjectOrder: $accounSubjectOrder
            totalLaborCost: $totalLaborCost
            totalDirectLaborCost: $totalDirectLaborCost
            totalIndirectLaborCost: $totalIndirectLaborCost
        ) {
            accounSubjectOrder
            totalLaborCost
            totalDirectLaborCost
            totalIndirectLaborCost
            items {
                occupation
                classification
                name
                salary
                allowance
                dailyAllowance
                retirementReserve
                socialInsuranceLevy
            }
        }
    }
`;
