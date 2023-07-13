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
        companyId
        messageId
        writedAt
        content
        createdAt
        createdBy
        updatedAt
        updatedBy
        ip
        active
        expresstionType
        classification
        fiscalYear
        facilityBusinessId
        year
        month
        writerCompactUser {
          id
          type
          username
          name
          active
        }
        fileStorages {
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
