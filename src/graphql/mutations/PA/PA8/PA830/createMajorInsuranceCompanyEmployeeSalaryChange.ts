import gql from "graphql-tag";
export default gql`
  mutation createMajorInsuranceCompanyEmployeeSalaryChange(
    $companyId: Int!
    $imputedYear: Int!
    $input: MajorInsuranceCompanyEmployeeSalaryChangeInput!
  ) {
    createMajorInsuranceCompanyEmployeeSalaryChange(
      companyId: $companyId
      imputedYear: $imputedYear
      input: $input
    ) {
      companyId
    }
  }
`;
