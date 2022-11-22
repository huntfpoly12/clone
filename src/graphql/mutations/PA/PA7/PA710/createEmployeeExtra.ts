import gql from "graphql-tag";
export default gql`
mutation createEmployeeExtra( 
    $companyId: Int!
    $imputedYear: Int!
    $input: EmployeeExtraCreateInput!
    ) {
        createEmployeeExtra( 
            companyId : $companyId,
            imputedYear: $imputedYear, 
            input: $input,
        ){
            type
        }
}`