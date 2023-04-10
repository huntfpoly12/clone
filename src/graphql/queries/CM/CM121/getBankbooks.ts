import gql from "graphql-tag";
export default gql`
 query
    getBankbooks($companyId: Int!, $fiscalYear: Int!) {
        getBankbooks(companyId: $companyId,fiscalYear: $fiscalYear) {
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
