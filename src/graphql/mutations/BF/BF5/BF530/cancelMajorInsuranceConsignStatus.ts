import gql from "graphql-tag";
export default gql`
  mutation cancelMajorInsuranceConsignStatus(
    $companyId: Int!
    $imputedYear: Int!
  ) {
    cancelMajorInsuranceConsignStatus(companyId: $companyId, imputedYear: $imputedYear) {
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
      # company
    }
  }
`;
