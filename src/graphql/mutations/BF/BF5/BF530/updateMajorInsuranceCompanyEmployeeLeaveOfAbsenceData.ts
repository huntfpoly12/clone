import gql from "graphql-tag";
export default gql`
  mutation updateMajorInsuranceCompanyEmployeeLeaveOfAbsenceData(
    $search: MajorInsuranceCompanyJoinManageInput!
    $data: MajorInsuranceDataUpdate!
  ) {
    updateMajorInsuranceCompanyEmployeeLeaveOfAbsenceData(
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
