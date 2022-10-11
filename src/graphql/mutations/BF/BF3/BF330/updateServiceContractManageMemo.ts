import gql from "graphql-tag";
export default gql`
mutation updateServiceContractManageMemo($companyId: Int!,$memoId: Float!,$memo: String!) {
  updateServiceContractManageMemo(companyId:$companyId,memoId: $memoId,memo:$memo){
        memoId
        ownerUserId
        ownerName
        ownerUsername
        memo
        createdAt
        createdBy
        updatedAt
        updatedBy
        ip
        active
  }
}
`