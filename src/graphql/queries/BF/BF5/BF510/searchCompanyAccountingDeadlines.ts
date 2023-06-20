import gql from "graphql-tag";
export default gql`
  query searchCompanyAccountingDeadlines($filter: AccountingDeadlineSearchFilter!) {
    searchCompanyAccountingDeadlines(filter: $filter) {
      companyId
      code
      name
      address
      phone
      presidentName
      presidentMobilePhone
      manageStartDate
      active
      compactSalesRepresentative {
        id
        code
        name
        active
        __typename @skip(if: true)
      }
      manageCompactUser {
        id
        type
        username
        name
        active
        __typename @skip(if: true)
      }
      compactAccountingProcesses {
        facilityBusinessId
        facilityBusinessName
        status
        __typename @skip(if: true)
      }
      __typename @skip(if: true)
    }
  }
`;
