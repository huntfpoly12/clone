import gql from 'graphql-tag';

export default gql`
    query getBudgets(
        $companyId: Int!,
        $fiscalYear: Int!,
        $facilityBusinessId: Int!
    ) {
        getBudgets(companyId: $companyId, fiscalYear: $fiscalYear, facilityBusinessId: $facilityBusinessId) {
            index
            accounSubjectOrder
            status
            savedAt
            savedBy
            employeePaySum
            revenueBudgetSum
            expenditureBudgetSum
            createdAt
            createdBy
#            updatedAt
#            updatedBy
#            active
            __typename @skip(if: true)
        }
    }
`
