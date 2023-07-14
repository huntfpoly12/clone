import gql from "graphql-tag";
export default gql`
  mutation createAccountingClosingMessage(
    $companyId: Int!,
    $fiscalYear: Int!,
    $facilityBusinessId: Int!,
    $year: Int!,
    $month: Int!
    $input: AccountingClosingMessageInput!
  ) {
    createAccountingClosingMessage(
      companyId: $companyId,
      fiscalYear: $fiscalYear,
      facilityBusinessId: $facilityBusinessId,
      year: $year,
      month: $month
      input: $input
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
`;
