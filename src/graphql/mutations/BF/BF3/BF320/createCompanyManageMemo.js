import gql from "graphql-tag";
export default gql`
mutation createCompanyManageMemo($companyId: Int!,$memo: String!) {
    createCompanyManageMemo(companyId:$companyId,memo:$memo){
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