import gql from "graphql-tag";
export default gql`
mutation updateEmployeeBusiness( 
    $companyId: Int!
    $imputedYear: Int!
    $employeeId: Int!
    $incomeTypeCode: String!
    $input: EmployeeBusinessUpdateInput!
    ) {
        updateEmployeeBusiness( 
            companyId : $companyId,
            imputedYear: $imputedYear, 
            employeeId: $employeeId,
            incomeTypeCode: $incomeTypeCode,
            input:$input
        ){
            type
        }
}`