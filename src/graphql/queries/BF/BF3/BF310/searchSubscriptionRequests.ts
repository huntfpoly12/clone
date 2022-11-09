import gql from "graphql-tag";
export default gql`
query searchSubscriptionRequests($filter: SubscriptionRequestViewSearchFilter!) {
    searchSubscriptionRequests(filter: $filter) {
      totalCount
      page
      rows
      datas{
        id
        status
        code
        companyCode  
        companyName
        companyAddress
        presidentName
        createdAt
        simpleAccountingInfos{
          name
          startYearMonth
        }
        simpleWithholdingInfo{
          name
          startYearMonth
        }
        compactSalesRepresentative{
          id
          code
          name
          active
        }
    
    }
  }
}
`
