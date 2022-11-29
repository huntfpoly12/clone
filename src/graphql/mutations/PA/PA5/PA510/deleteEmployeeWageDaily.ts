import gql from "graphql-tag";
export default gql`
mutation deleteEmployeeWageDaily( 
    $companyId: Int!
    $imputedYear :Int!
    $employeeId :Int!
    ) {
        deleteEmployeeWageDaily( 
            companyId : $companyId
            imputedYear: $imputedYear
            employeeId: $employeeId
        ) 
    }`