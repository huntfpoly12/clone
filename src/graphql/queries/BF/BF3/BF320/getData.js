import gql from "graphql-tag";
const queries = {
  searchCompanies: gql`
      query searchCompanies ($page: Int!, $rows: Int!, $excludeCancel: Boolean!) {
        searchCompanies (filter: { page: $page, rows: $rows, excludeCancel: $excludeCancel }) {
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
    `,

};

export default queries;