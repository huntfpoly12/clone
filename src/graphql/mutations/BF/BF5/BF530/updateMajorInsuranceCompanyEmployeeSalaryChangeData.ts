import gql from "graphql-tag";
export default gql`
  mutation updateMajorInsuranceCompanyEmployeeSalaryChangeData(
    $search: MajorInsuranceCompanyJoinManageInput!
    $data: MajorInsuranceDataUpdate!
  ) {
    updateMajorInsuranceCompanyEmployeeSalaryChangeData(
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
