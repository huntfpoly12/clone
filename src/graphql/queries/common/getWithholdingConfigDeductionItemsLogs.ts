import gql from "graphql-tag";
export default gql`
query getWithholdingConfigDeductionItemsLogs($companyId: Int!,$imputedYear : Int! ) {
    getWithholdingConfigDeductionItemsLogs(companyId : $companyId, imputedYear : $imputedYear ) {
        ts
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
        loggedAt
        remark
  }
}
`