import gql from "graphql-tag";
export default gql`
mutation updateWithholdingConfig( $companyId : Int!,$imputedYear: Int!,$input : WithholdingConfigInput! ) {
            updateWithholdingConfig( companyId : $companyId,imputedYear: $imputedYear, input: $input)
            {
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
            }
}
`