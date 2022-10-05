import gql from "graphql-tag";
export default gql`
mutation updateCompanyManageMemo($companyId: Int!,$memoId: Float!,$memo: String!) {
    updateCompanyManageMemo(companyId:$companyId,memoId: $memoId,memo:$memo){
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