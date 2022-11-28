import gql from "graphql-tag";
export default gql`
    query
    getWithholdingConfig( $companyId: Int!,$imputedYear: Int! ) {
            getWithholdingConfig(companyId : $companyId, imputedYear: $imputedYear) {
                reportType
                paymentType
                paymentDay
                insuranceSupport
                competentTaxOfficeCode
                localIncomeTaxArea
                collectivePayment
                taxForEachBusiness
                createdAt
                createdBy
                updatedAt
                updatedBy
                ip
                active
                companyAddressInfo{
                    address
                    roadAddress
                    addressExtend
                    zipcode
                    bcode
                }
                undeclaredIncomeStatus
            }
        }
`