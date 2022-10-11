import gql from "graphql-tag";
export default gql`
    query
    getWithholdingConfigPayItem( $companyId: Int!,$imputedYear: Int!,$itemCode: Int! ) {
        getWithholdingConfigPayItem(companyId : $companyId, imputedYear: $imputedYear, itemCode: $itemCode) {
            itemCode
            name
            taxPayItemCode
            taxPayItemName
            taxfreePayItemCode
            taxfreePayItemName
            monthlyLimit
            annualLimit
            tax
            taxFreeIncludeSubmission
            use
            sort
            formula
            createdAt
            createdBy
            updatedAt
            updatedBy
            ip
            active
            editable
        }
    }
    
`