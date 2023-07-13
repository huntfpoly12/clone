import gql from "graphql-tag";
export default gql`
  mutation createInquiryMessage(
    $companyId: Int!
    $input: InquiryMessageCreateInput!
  ) {
    createInquiryMessage(
      companyId: $companyId
      input: $input
    ) {
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
        secret
        answeredAt
        answer
        company {
            id
            code
            name
            bizNumber
            bizType
            address
            phone
            presidentName
            presidentMobilePhone
            # extendInfo
            sealFileStorageId
            createdAt
            createdBy
            updatedAt
            updatedBy
            ip
            active
            residentId
            # seal
            canceledAt
            unpaidMonths
        }
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
        # answerCompactUser
        answerFileStorages {
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
`;
