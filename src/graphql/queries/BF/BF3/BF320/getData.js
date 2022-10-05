import gql from "graphql-tag";
export default gql`
      query searchCompanies (
          $page: Int!, 
          $rows: Int!,
          $excludeCancel: Boolean!
          $code: String
          $name: String
          $presidentName: String
          $address: String
          $manageUserId: Int
          $salesRepresentativeId: Int 
        ) {
        searchCompanies (filter: { 
          page: $page,
          rows: $rows, 
          excludeCancel: $excludeCancel,
          code: $code
          name: $name
          presidentName: $presidentName
          address: $address
          manageUserId: $manageUserId
          salesRepresentativeId: $salesRepresentativeId
          }) {
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
              name
            }
            manageCompactUser{
              name
            }
            canceledAt
            unpaidMonths
          }
        }
      }
    `