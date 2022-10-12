import gql from "graphql-tag";
export default gql`
mutation createWithholdingConfigPayItem($companyId: Int!,$imputedYear: Int!,$input:WithholdingConfigPayItemCreateInput!) {
    createWithholdingConfigPayItem(companyId: $companyId,imputedYear: $imputedYear,input:$input){
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
