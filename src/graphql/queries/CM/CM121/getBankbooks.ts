import gql from "graphql-tag";
export default gql`
 query
    getBankbooks($companyId: Int!, $fiscalYear: Int!, $facilityBusinessId: Int!) {
        getBankbooks(companyId: $companyId,fiscalYear: $fiscalYear, facilityBusinessId: $facilityBusinessId) {
            facilityBusinessId
            bankbookId
            sort
            type
            bankbookNumber
            bankbookNickname
            classification
            useType
            owner
            accountCode
            accountName
            useScrap
            createdAt
            createdBy
            updatedAt
            updatedBy
            ip
            active
            lastScrapingStatus{
                lastScrapingDate
                scrapingStatus
                errorMessage
            }
        }
    }
`