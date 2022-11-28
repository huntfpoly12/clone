import gql from "graphql-tag";
export default gql`
mutation updateWithholdingConfigDeductionItem( 
    $companyId : Int!,
    $imputedYear: Int!,
    $itemCode: Int!,
    $input : WithholdingConfigDeductionItemUpdateInput! 
    ) {
    updateWithholdingConfigDeductionItem( companyId : $companyId,imputedYear: $imputedYear, itemCode: $itemCode, input: $input)
            {
                itemCode
                name
                deductionItemCode
                static
                use
                formula
                createdAt
                createdBy
                updatedAt
                updatedBy
                ip
                active
            }
}
`