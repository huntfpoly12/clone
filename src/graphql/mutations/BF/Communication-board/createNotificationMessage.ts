import gql from "graphql-tag";
export default gql`
    mutation createNotificationMessage(
        $companyId: Int!,
        $input: NotificationMessageCreateInput!
    ) {
        createNotificationMessage(
            companyId: $companyId,
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
        }

    }
`
