import gql from "graphql-tag";
export default gql`
  query createMajorInsuranceConsignStatus(
    $companyId: Int!
    $manageId: String!
  ) {
    createMajorInsuranceConsignStatus(
      companyId: $companyId
      manageId: $manageId
    ) {
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
