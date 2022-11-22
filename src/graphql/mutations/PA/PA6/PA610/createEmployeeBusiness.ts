import gql from "graphql-tag";
export default gql`
mutation createEmployeeBusiness( 
    $companyId: Int!
    $imputedYear: Int!
    $input: EmployeeBusinessCreateInput!
    ) {
        createEmployeeBusiness( 
            companyId : $companyId,
            imputedYear: $imputedYear, 
            input: $input,
        ){
            type
        }
}`