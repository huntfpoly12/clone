import gql from "graphql-tag";
export default gql`
query getWithholdingConfigPayItemsLogs($companyId: Int!,$imputedYear : Int! ) {
    getWithholdingConfigPayItemsLogs(companyId : $companyId, imputedYear : $imputedYear ) {
        ts
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
        loggedAt
        remark
  }
}
`