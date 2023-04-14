import gql from "graphql-tag";
export default gql`
  query getMycompany($companyId: Int!) {
    getMycompany(
      companyId: $companyId
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
      extendInfo
      sealFileStorageId
      createdAt
      createdBy
      updatedAt
      updatedBy
      ip
      active
      residentId
      seal
      canceledAt
      unpaidMonths
    }
  }
`;
