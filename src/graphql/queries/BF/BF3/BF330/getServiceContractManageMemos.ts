import gql from "graphql-tag";
export default  gql`
query getServiceContractManageMemos($companyId: Int!) {
    getServiceContractManageMemos(companyId : $companyId) {
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