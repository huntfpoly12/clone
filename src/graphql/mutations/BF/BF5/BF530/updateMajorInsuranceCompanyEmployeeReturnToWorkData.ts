import gql from "graphql-tag";
export default gql`
  mutation updateMajorInsuranceCompanyEmployeeReturnToWorkData(
    $search: MajorInsuranceCompanyJoinManageInput!
    $data: MajorInsuranceDataUpdate!
  ) {
    updateMajorInsuranceCompanyEmployeeReturnToWorkData(
      search: $search
      data: $data
    ) {
      companyId
      type
      imputedYear
      workId
    }
  }
`;
