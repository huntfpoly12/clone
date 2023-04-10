import gql from "graphql-tag";
export default gql`
    query
    getBankbookScrapInfo(
        $companyId: Int!,
        $fiscalYear: Int!,
        $facilityBusinessId: Int!,
        $bankbookId: Int!) {
        getBankbookScrapInfo(
            companyId: $companyId,
            fiscalYear: $fiscalYear,
            facilityBusinessId: $facilityBusinessId,
            bankbookId: $bankbookId
            ) {
                lastScrapingDate
                scrapingStatus
                errorMessage
            }
        }
`