import gql from "graphql-tag";
export default gql`
mutation deleteServiceContractManageMemo($companyId: Int!,$memoId: Float!) {
    deleteServiceContractManageMemo(companyId:$companyId,memoId:$memoId)
}
`