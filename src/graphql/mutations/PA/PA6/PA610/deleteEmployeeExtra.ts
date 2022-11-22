import gql from "graphql-tag";
export default gql`
mutation deleteEmployeeExtra( 
    $companyId: Int!
    $imputedYear: Int!
    $employeeId: Int!
    $incomeTypeCode: String!
    ) {
        deleteEmployeeExtra( 
            companyId : $companyId,
            imputedYear: $imputedYear, 
            employeeId: $employeeId,
            incomeTypeCode: $incomeTypeCode,
        )
}`