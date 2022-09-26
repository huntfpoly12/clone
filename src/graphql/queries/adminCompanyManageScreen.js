import gql from "graphql-tag";
const queries = {
  findParters: gql`
      query searchCompanies  {
        CompanyViewPaginatedObject     {
            filter 
            {
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
              compactSalesRepresentative
              manageCompactUser
            }
        }
      }
    `,

};

export default queries;