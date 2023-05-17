import gql from "graphql-tag";
export default gql`
  mutation updateMajorInsuranceCompanyEmployeeAcquisitionData(
    $search: MajorInsuranceCompanyJoinManageInput!
    $data: MajorInsuranceDataUpdate!
  ) {
    updateMajorInsuranceCompanyEmployeeAcquisitionData(
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
