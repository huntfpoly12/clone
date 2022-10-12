import gql from "graphql-tag";
export default gql`
mutation deleteWithholdingConfigPayItem( $companyId : Int!,$imputedYear: Int!,$itemCode : Int! ) {
    deleteWithholdingConfigPayItem( companyId : $companyId,imputedYear: $imputedYear, itemCode: $itemCode)
          
}
`