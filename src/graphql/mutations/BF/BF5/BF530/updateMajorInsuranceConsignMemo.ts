import gql from "graphql-tag";
export default gql`
  mutation updateMajorInsuranceConsignMemo(
    $companyId: Int!
    $memo: String!
  ) {
    updateMajorInsuranceConsignMemo(companyId: $companyId, memo: $memo) {
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
