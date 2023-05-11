import gql from "graphql-tag";
export default gql`
mutation updateEmployeeExtra( 
    $companyId: Int!
    $imputedYear: Int!
    $employeeId: Int!
    $input: EmployeeExtraUpdateInput!
    ) {
        updateEmployeeExtra( 
            companyId : $companyId,
            imputedYear: $imputedYear, 
            employeeId: $employeeId,
            input: $input,
        ){
            type
            employeeId
        }
}`