import gql from "graphql-tag";
export default gql`
  mutation updateMajorInsuranceConsignWorkingStatus(
    $companyId: Int!
    $workingStatus: Int!
  ) {
    updateMajorInsuranceConsignWorkingStatus(companyId: $companyId, workingStatus: $workingStatus) {
      companyId
      manageId
      partnerId
      companyConsignStatus
      # nationalPensionEDIStatus
      # healthInsuranceEDIStatus
      # workingStatus
      # nationalPensionBranchName
      # nationalPensionFax
      # healthInsuranceBranchName
      # healthInsuranceFax
      # employeementInsuranceBranchName
      # employeementInsuranceFax
      # industrialAccidentInsuranceBranchName
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
`;
