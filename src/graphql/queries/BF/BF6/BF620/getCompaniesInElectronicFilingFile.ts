import gql from "graphql-tag";
export default gql`
  query getCompaniesInElectronicFilingFile(
    $electronicFilingId: Int!
    $type: Int!
  ) {
    getCompaniesInElectronicFilingFile(
      electronicFilingId: $electronicFilingId
      type: $type
    ) {
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
  }
`;
