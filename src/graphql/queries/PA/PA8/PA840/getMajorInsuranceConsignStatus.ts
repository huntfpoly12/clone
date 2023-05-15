import gql from "graphql-tag";
export default gql`
  query getMajorInsuranceConsignStatus($companyId: Int!) {
    getMajorInsuranceConsignStatus(companyId: $companyId) {
      companyId
      manageId
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
      createdAt
      createdBy
      updatedAt
      updatedBy
      ip
      active
    }
  }
`;
