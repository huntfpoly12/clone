import gql from "graphql-tag";
export default gql`
 query
    getBankbook($companyId: Int!, $fiscalYear: Int!, $facilityBusinessId: Int!, $bankbookId: Int!) {
        getBankbook(companyId: $companyId,fiscalYear: $fiscalYear,facilityBusinessId: $facilityBusinessId,bankbookId: $bankbookId) {
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
            facilityBusiness{
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
            lastScrapingStatus{
                lastScrapingDate
                scrapingStatus
                errorMessage
            }
        }
    }
`
