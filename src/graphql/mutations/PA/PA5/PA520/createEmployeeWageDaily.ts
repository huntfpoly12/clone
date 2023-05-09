import gql from "graphql-tag";
export default gql`
mutation createEmployeeWageDaily( 
    $companyId: Int!
    $imputedYear :Int!
    $input :EmployeeWageDailyInput!
    ) {
        createEmployeeWageDaily( 
            companyId : $companyId
            imputedYear: $imputedYear
            input: $input
        ) {
            type
          }
    }`
