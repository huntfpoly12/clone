import gql from "graphql-tag";
export default gql`
  mutation updateMajorInsuranceCompanyJoinData(
    $search: MajorInsuranceCompanyJoinManageInput!
    $data: MajorInsuranceDataUpdate!
  ) {
    updateMajorInsuranceCompanyJoinData(search: $search, data: $data) {
      companyId
      type
      imputedYear
      workId
      companyType
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
      active
      company
    }
  }
`;
