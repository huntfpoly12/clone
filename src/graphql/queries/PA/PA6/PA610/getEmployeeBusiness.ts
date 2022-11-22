import gql from "graphql-tag";
export default gql`
    query
    getEmployeeBusiness(
            $companyId: Int!
            $imputedYear: Int!
        ){
            getEmployeeBusiness(companyId: $companyId, imputedYear: $imputedYear) { 
                employeeId
                name
                status
                foreigner 
                residentId
                incomeTypeCode
                incomeTypeName 
            }
        }`