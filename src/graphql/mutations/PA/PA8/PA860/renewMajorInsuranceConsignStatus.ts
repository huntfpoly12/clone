import gql from "graphql-tag";
export default gql`
  mutation renewMajorInsuranceConsignStatus(
    $companyId: Int!
    $manageId: String!
  ) {
    renewMajorInsuranceConsignStatus(
      companyId: $companyId
      imputedYear: $imputedYear
      workId: $workId
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
