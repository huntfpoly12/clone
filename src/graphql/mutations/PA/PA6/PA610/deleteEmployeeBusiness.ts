import gql from "graphql-tag";
export default gql`
mutation deleteEmployeeBusiness( 
    $companyId: Int!
    $imputedYear: Int!
    $employeeId: Int!
    ) {
        deleteEmployeeBusiness( 
            companyId : $companyId,
            imputedYear: $imputedYear, 
            employeeId: $employeeId,
        )
}`
