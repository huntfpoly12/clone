import gql from "graphql-tag";
export default gql`
  query getMajorInsuranceConsignStatusLogs($companyId: Int!) {
    getMajorInsuranceConsignStatusLogs(companyId: $companyId) {
      companyId
      ts
      manageId
      workingStatus
      partnerId
      companyConsignStatus
      nationalPensionEDIStatus
      healthInsuranceEDIStatus
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
      loggedAt
      remark
    }
  }
`;
