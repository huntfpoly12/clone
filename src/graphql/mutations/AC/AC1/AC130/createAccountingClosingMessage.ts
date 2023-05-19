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
`;
