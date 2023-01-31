import gql from "graphql-tag";
export default gql`
  query getCompaniesInElectronicFilingFile($electronicFilingId: Int!) {
    getCompaniesInElectronicFilingFile(filter: $filter) {
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
