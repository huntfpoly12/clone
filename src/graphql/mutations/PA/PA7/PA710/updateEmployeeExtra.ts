import gql from "graphql-tag";
export default gql`
mutation updateEmployeeExtra( 
    $companyId: Int!
    $imputedYear: Int!
    $employeeId: Int!
    $incomeTypeCode: String!
    $input: EmployeeExtraUpdateInput!
    ) {
        updateEmployeeExtra( 
            companyId : $companyId,
            imputedYear: $imputedYear, 
            employeeId: $employeeId,
            incomeTypeCode: $incomeTypeCode
            input: $input,
        ){
            type
            employeeId
            incomeTypeCode
        }
}`