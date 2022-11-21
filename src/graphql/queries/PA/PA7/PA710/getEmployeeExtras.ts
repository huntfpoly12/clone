import gql from "graphql-tag";
export default gql`
    query
    getEmployeeExtras(
            $companyId: Int!
            $imputedYear: Int!
        ){
            getEmployeeExtras(companyId: $companyId, imputedYear: $imputedYear) {
                type
                employeeId
                incomeTypeCode
                name
                foreigner
                nationality
                nationalityCode
                stayQualification
                residentIdValidity
                roadAddress
                status
                createdAt
                createdBy
                updatedAt
                updatedBy
                ip
                active
                residentId
                incomeTypeName
                deletable
            }
        }`