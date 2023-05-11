import gql from "graphql-tag";
export default gql`
mutation deleteEmployeeExtra( 
    $companyId: Int!
    $imputedYear: Int!
    $employeeId: Int!
    ) {
        deleteEmployeeExtra( 
            companyId : $companyId,
            imputedYear: $imputedYear, 
            employeeId: $employeeId,
        )
}`