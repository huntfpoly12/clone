import gql from "graphql-tag";
export default gql`
  query getAccountingClosingMessages(
    $filter: AccountingClosingMessageSearchFilter!
  ) {
    getAccountingClosingMessages(filter: $filter) {
      totalCount
      page
      rows
      datas {
        id
        expresstionType
        classification
        content
        companyId
        fiscalYear
        facilityBusinessId
        year
        month
        writedAt
        createdAt
        createdBy
        updatedAt
        updatedBy
        ip
        active
        writerUser {
          id
          type
          username
          name
          active
        }
        files {
          id
          name
          url
          turl
          createdAt
          createdBy
          updatedAt
          updatedBy
          ip
          active
        }
      }
    }
  }
`;
