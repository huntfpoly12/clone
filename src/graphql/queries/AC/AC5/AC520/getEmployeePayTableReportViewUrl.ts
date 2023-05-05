import gql from 'graphql-tag';

export default gql`
    query getEmployeePayTableReportViewUrl(
        $companyId: Int!,
        $fiscalYear: Int!,
        $facilityBusinessId: Int!,
        $index: Int!,
    ) {
        getEmployeePayTableReportViewUrl(
            companyId: $companyId,
            fiscalYear: $fiscalYear,
            facilityBusinessId: $facilityBusinessId,
            index: $index,
        )
    }
`
