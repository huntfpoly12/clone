import gql from "graphql-tag";
export default gql`
    query
        getMyCompanyUser(
            $companyId: Int!,  
            $userId : Int!
        ){
            getMyCompanyUser(companyId : $companyId, userId : $userId) {
                id
                type
                username
                name
                mobilePhone
                email
                president
                managerGrade
                accountingRole
                withholdingRole
                createdAt
                createdBy
                updatedAt
                updatedBy
                ip
                active
                facilityBusinesses {
                    facilityBusinessId
                }
            }
        }`