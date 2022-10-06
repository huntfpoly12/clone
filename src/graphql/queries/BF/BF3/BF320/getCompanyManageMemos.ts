import gql from "graphql-tag";

export default gql`
query getCompanyManageMemos ($companyId: Int!) {
    getCompanyManageMemos(companyId:$companyId){
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