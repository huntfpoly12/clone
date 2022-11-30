import gql from "graphql-tag";
export default gql`
mutation saveEmployeeWageDailyPayDeduction( 
    $companyId: Int!
    $imputedYear :Int!
    $employeeId :Int!
    $input :EmployeeWageDailyPayDeductionInput!
    ) {
        saveEmployeeWageDailyPayDeduction( 
            companyId : $companyId
            imputedYear: $imputedYear
            employeeId: $employeeId
            input: $input
        ) {
            type
          }
    }`