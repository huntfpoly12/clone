import gql from 'graphql-tag';

export default gql`
    query getBudget(
        $companyId: Int!,
        $fiscalYear: Int!,
        $facilityBusinessId: Int!,
        $index: Int!,
        $type: Int!
    ) {
        getBudget(companyId: $companyId, fiscalYear: $fiscalYear, facilityBusinessId: $facilityBusinessId, index: $index, type: $type) {
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
                    __typename @skip(if: true)
                }
                __typename @skip(if: true)

            }
        }
    }
`
