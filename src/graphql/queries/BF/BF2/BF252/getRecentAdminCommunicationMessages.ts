import gql from "graphql-tag";
export default gql`
  query getRecentAdminCommunicationMessages($filter: ConnectionFilter !) {
    getRecentAdminCommunicationMessages(filter : $filter){
      totalCount
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          companyId
          messageId
          expresstionType
          classification
          writedAt
          content
          secret
          fiscalYear
          facilityBusinessId
          year
          month
          writerCompactUser {
            id
          }
        }
      }
      __typename @skip(if: true)
    }
  }`
