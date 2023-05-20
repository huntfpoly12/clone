import gql from "graphql-tag";
export default gql`
  mutation updateMajorInsuranceLocalOfficeInfo(
    $companyId: Int!
    $input: MajorInsuranceLocalOfficeInfo!
  ) {
    updateMajorInsuranceLocalOfficeInfo(companyId: $companyId, input: $input) {
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
