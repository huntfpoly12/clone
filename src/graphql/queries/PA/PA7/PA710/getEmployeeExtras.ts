import gql from "graphql-tag";
export default gql`
    query
    getEmployeeExtras(
            $companyId: Int!
            $imputedYear: Int!
        ){
            getEmployeeExtras(companyId: $companyId, imputedYear: $imputedYear) {
                employeeId
                incomeTypeCode
                incomeTypeName
                name
                foreigner
                nationality
                nationalityCode
                stayQualification
                email
                residentId
                deletable
            }
        }`