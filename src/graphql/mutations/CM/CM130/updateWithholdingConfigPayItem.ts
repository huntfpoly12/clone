import gql from "graphql-tag";
export default gql`
mutation updateWithholdingConfigPayItem( $companyId : Int!,$imputedYear: Int!, $itemCode: Int!,$input : WithholdingConfigPayItemUpdateInput! ) {
    updateWithholdingConfigPayItem( companyId : $companyId,imputedYear: $imputedYear, itemCode: $itemCode, input: $input)
            {
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