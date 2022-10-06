import gql from "graphql-tag";
export default gql`
mutation deleteCompanyManageMemo($companyId: Int!,$memoId: Float!) {
    deleteCompanyManageMemo(companyId:$companyId,memoId:$memoId)
}
`