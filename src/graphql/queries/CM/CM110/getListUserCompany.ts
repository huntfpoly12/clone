import gql from "graphql-tag";
export default gql`
    query
        getMyCompanyUsers(
            $companyId: Int!,  
            $filter : PaginatedFilter!
        ){
            getMyCompanyUsers(companyId : $companyId, filter : $filter) {
                totalCount
                page 
                rows 
                datas{
                    id
                    username
                    name
                    accountingRole
                    withholdingRole
                    active
                    facilityBusinesses {
                        facilityBusinessId 
                    name 
                    longTermCareInstitutionNumber 
                    facilityBizType 
                    startYearMonth 
                    capacity 
                    registrationCardFileStorageId 
                    price 
                    createdAt 
                    createdBy 
                    updatedAt
                    updatedBy 
                    ip 
                    active 
                    }
                }
            }
        }`