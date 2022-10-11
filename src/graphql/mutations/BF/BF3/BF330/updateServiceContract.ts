import gql from "graphql-tag";
export default gql`
mutation updateServiceContract( $id: Int! ,$info: CompanyUsedServiceInfoInput , $extra: CompanyExtraInput) 
  {
    updateServiceContract(id: $id, info: $info, extra: $extra){
      id
      servicePrice
      accountingPrice
      withholdingPrice
      usedAccountingCount
      usedWithholding
  }
}
`