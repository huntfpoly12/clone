import gql from "graphql-tag";
export default gql`
    query
    getEmployeeBusiness(
            $companyId: Int!
            $imputedYear: Int!
            $employeeId:Int! 
            $incomeTypeCode: String!
        ){
            getEmployeeBusiness(companyId: $companyId, imputedYear: $imputedYear, employeeId : $employeeId,incomeTypeCode:$incomeTypeCode) { 
                employeeId
                name
                status
                foreigner 
                residentId
                incomeTypeCode
                incomeTypeName 
            }
        }`