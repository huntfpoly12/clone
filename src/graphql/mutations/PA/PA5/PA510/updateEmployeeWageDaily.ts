import gql from "graphql-tag";
export default gql`
mutation updateEmployeeWageDaily( 
    $companyId: Int!
    $imputedYear :Int!
    $employeeId :Int!
    $input :EmployeeWageDailyUpdateInput!
    ) {
        updateEmployeeWageDaily( 
            companyId : $companyId
            imputedYear: $imputedYear
            employeeId: $employeeId
            input: $input
        ) {
            type
          }
    }`