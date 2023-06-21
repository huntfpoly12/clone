import gql from "graphql-tag";
export default gql`
    mutation changeAccountingProcessStatus (
        $companyId: Int!
        $fiscalYear: Int!
        $facilityBusinessId: Int!
        $year: Int!
        $month: Int!
        $status: ProcessStatusScalar!
    ) {
        changeAccountingProcessStatus (
            companyId: $companyId
            fiscalYear: $fiscalYear
            facilityBusinessId: $facilityBusinessId
            year: $year
            month: $month
            status: $status
        ) {
            year
            month
        }   
    }
`;
