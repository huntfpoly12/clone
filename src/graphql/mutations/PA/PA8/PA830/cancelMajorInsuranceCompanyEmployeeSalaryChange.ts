import gql from "graphql-tag";
export default gql`
  mutation cancelMajorInsuranceCompanyEmployeeSalaryChange(
    $companyId: Int!
    $imputedYear: Int!
    $workId: Int!
  ) {
    cancelMajorInsuranceCompanyEmployeeSalaryChange(
      companyId: $companyId
      imputedYear: $imputedYear
      workId: $workId
    ) {
      companyId
    }
  }
`;
