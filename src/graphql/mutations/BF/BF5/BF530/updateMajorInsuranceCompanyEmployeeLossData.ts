import gql from "graphql-tag";
export default gql`
  mutation updateMajorInsuranceCompanyEmployeeLossData(
    $search: MajorInsuranceCompanyJoinManageInput!
    $data: MajorInsuranceDataUpdate!
  ) {
    updateMajorInsuranceCompanyEmployeeLossData(
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
