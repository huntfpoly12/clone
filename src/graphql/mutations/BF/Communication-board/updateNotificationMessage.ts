import gql from "graphql-tag";
export default gql`
    mutation updateNotificationMessage(
        $companyId: Int!,
        $messageId: Int!,
        $input: NotificationMessageUpdateInput!

    ) {
        updateNotificationMessage(
            companyId: $companyId,
            messageId: $messageId,
            input: $input,
        ){
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
          company {
            code
            active
            id
            name
            address
            __typename @skip(if: true)
          }
          writerCompactUser {
            id
            name
            username
            active
            __typename @skip(if: true)
          }
          fileStorages {
            id
            name
            url
            turl
            __typename @skip(if: true)
          }
          __typename @skip(if: true)
        }
    }
`
