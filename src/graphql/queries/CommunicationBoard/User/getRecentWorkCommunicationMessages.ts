import gql from "graphql-tag";
export default gql`
  query getRecentWorkCommunicationMessages(
    $companyId: Int!
    $filter: ConnectionFilter!
    $currentUserId: Int!
  ) {
    getRecentWorkCommunicationMessages(
      companyId: $companyId
      filter: $filter
      currentUserId: $currentUserId
    ) {
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
                    type
                    username
                    name
                    active
                }
            }
        }
    }
  }
`;
