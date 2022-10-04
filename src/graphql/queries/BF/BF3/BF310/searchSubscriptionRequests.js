import gql from "graphql-tag";
export default gql`
query searchSubscriptionRequests($withholding : Boolean,$accounting : Boolean, $page: Int!, $rows: Int!, $companyName: String, $presidentName: String, $salesRepresentativeId: Int, $startDate: String, $finishDate: String, $statuses: [Int!]!) {
    searchSubscriptionRequests(filter: 
    { 
      page: $page, 
      rows:$rows, 
      companyName:$companyName, 
      presidentName: $presidentName, 
      salesRepresentativeId: $salesRepresentativeId, 
      startDate: $startDate, 
      finishDate : $finishDate ,
      withholding : $withholding,
      statuses : $statuses
      accounting: $accounting
    }) {
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
