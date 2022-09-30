import gql from "graphql-tag";
export default  gql`
query searchSubscriptionRequests($page: Int!, $rows: Int!, $companyName: String, $presidentName: String, $salesRepresentativeId: Int, $startDate: String, $finishDate: String) {
    searchSubscriptionRequests(filter: { page: $page, rows:$rows, companyName:$companyName, presidentName: $presidentName, salesRepresentativeId: $salesRepresentativeId, startDate: $startDate, finishDate : $finishDate }) {
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