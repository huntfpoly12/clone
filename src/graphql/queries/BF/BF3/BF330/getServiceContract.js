import gql from "graphql-tag";
export default  gql`
query getServiceContract {
    getServiceContract {
    id
    servicePrice
    accountingPrice
    withholdingPrice
    usedAccountingCount
    usedWithholding
    usedServiceInfo
    salesRepresentativeId
    manageUserId
    manageStartDate
    createdAt
  }
}
`