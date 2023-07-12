import gql from "graphql-tag";
export default gql`
  query getRecentAdminCommunicationMessages($filter: ConnectionFilter !) {
    getRecentAdminCommunicationMessages(filter : $filter){
      totalCount
      pageInfo {
        hasNextPage
        __typename @skip(if: true)
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
            type
            username
            name
            active
            __typename @skip(if: true)
          }
          __typename @skip(if: true)
        }
        __typename @skip(if: true)
      }
      __typename @skip(if: true)
    }
  }`
