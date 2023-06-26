import gql from "graphql-tag";
export default gql`
  mutation updateMajorInsuranceConsignStatus(
    $companyId: Int!
    $companyConsignStatus: Int!
    $nationalPensionEDIStatus: Int!
    $healthInsuranceEDIStatus: Int!
    $workingStatus: Int!
    $memo: String!
  ) {
    updateMajorInsuranceConsignStatus(
      companyId: $companyId
      companyConsignStatus: $companyConsignStatus
      nationalPensionEDIStatus: $nationalPensionEDIStatus
      healthInsuranceEDIStatus: $healthInsuranceEDIStatus
      workingStatus: $workingStatus
      memo: $memo
    ) {
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
