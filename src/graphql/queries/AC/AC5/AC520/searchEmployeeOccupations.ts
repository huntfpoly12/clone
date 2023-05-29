import gql from 'graphql-tag';

export default gql`
    query searchEmployeeOccupations(
        $companyId: Int!,
        $keyword: String,
    ) {
        searchEmployeeOccupations(
            companyId: $companyId,
            keyword: $keyword,
        )
    }
`
