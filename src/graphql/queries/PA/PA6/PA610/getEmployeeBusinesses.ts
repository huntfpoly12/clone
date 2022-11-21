import gql from "graphql-tag";
export default gql`
    query
    getEmployeeExtras(
            $companyId: Int!
            $imputedYear: Int!
        ){
            getEmployeeBusinesses(companyId: $companyId, imputedYear: $imputedYear) { 
                employeeId
                name
                status
                foreigner 
                residentId
                incomeTypeCode
                incomeTypeName 
            }
        }`