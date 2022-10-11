import gql from "graphql-tag";
export default gql`
mutation createServiceContractManageMemo($companyId: Int!,$memo: String!) {
  createServiceContractManageMemo(companyId:$companyId,memo:$memo){
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