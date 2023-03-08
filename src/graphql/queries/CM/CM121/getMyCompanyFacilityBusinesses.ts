import gql from "graphql-tag";
export default gql`
    query
    getMyCompanyFacilityBusinesses($companyId: Int!) {
        getMyCompanyFacilityBusinesses(companyId: $companyId) {
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
`