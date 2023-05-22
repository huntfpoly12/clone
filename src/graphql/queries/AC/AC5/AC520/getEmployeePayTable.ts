import gql from 'graphql-tag';

export default gql`
    query getEmployeePayTable(
        $companyId: Int!,
        $fiscalYear: Int!,
        $facilityBusinessId: Int!,
        $index: Int!,
    ) {
        getEmployeePayTable(companyId: $companyId, fiscalYear: $fiscalYear, facilityBusinessId: $facilityBusinessId, index: $index) {
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
                __typename @skip(if: true)

            }
        }
    }
`
