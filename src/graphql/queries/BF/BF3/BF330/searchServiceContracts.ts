import gql from "graphql-tag";
export default  gql`
query searchServiceContracts($filter: CompanyViewSearchFilter!) {
    searchServiceContracts(filter: $filter) {
    totalCount
    page
    rows
    datas {
      id
      code
      name
      address
      phone
      presidentName
      presidentMobilePhone
      manageStartDate
      usedAccountingCount
      usedWithholding
      servicePrice
      active
      compactSalesRepresentative {
        id
        code
        name
        active
      }
      manageCompactUser {
        id
        type
        username
        name
        active
      }
      canceledAt
      unpaidMonths
    }
  }
}
`