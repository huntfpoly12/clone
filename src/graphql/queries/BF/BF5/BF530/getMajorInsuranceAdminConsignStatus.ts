import gql from "graphql-tag";
export default gql`
  query getMajorInsuranceAdminConsignStatus($input: AdminConsignSearchInput) {
    getMajorInsuranceAdminConsignStatus(input: $input) {
      companyId
      manageId
      partnerId
      companyConsignStatus
      nationalPensionEDIStatus
      healthInsuranceEDIStatus
      workingStatus
      nationalPensionBranchName
      nationalPensionFax
      healthInsuranceBranchName
      healthInsuranceFax
      employeementInsuranceBranchName
      employeementInsuranceFax
      industrialAccidentInsuranceBranchName
      industrialAccidentInsuranceFax
      registeredAt
      acceptedAt
      completedAt
      memo
      createdAt
      createdBy
      updatedAt
      updatedBy
      ip
      active
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
    }
  }
`;
