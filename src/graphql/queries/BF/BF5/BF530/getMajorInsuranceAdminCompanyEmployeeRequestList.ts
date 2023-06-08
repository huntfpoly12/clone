import gql from "graphql-tag";
export default gql`
  query getMajorInsuranceAdminCompanyEmployeeRequestList(
    $input: AdminCompnaySearchInput!
  ) {
    getMajorInsuranceAdminCompanyEmployeeRequestList(input: $input) {
      companyId
      type
      imputedYear
      workId
      employeeType
      employeeId
      name
      nationalPensionReport
      healthInsuranceReport
      employeementInsuranceReport
      industrialAccidentInsuranceReport
      workingStatus
      registeredAt
      acceptedAt
      completedAt
      acceptedNumber
      memo
      createdAt
      createdBy
      updatedAt
      updatedBy
      ip
      residentId
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
      majorInsuranceConsignStatus {
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
        # industrialAccidentInsuranceFax
        # registeredAt
        # acceptedAt
        # completedAt
        # memo
        # createdAt
        # createdBy
        # updatedAt
        # updatedBy
        # ip
        # active
        # company
      }
    }
  }
`;
