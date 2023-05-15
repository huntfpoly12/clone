import gql from "graphql-tag";
export default gql`
  query getMajorInsuranceCompanyEmployeeSalaryChangeFaxFilingReportViewUrl(
    $companyId: Int!
    $imputedYear: Int!
    $workId: Int!
  ) {
    getMajorInsuranceCompanyEmployeeSalaryChangeFaxFilingReportViewUrl(
      companyId: $companyId
      imputedYear: $imputedYear
      workId: $workId
    )
  }
`;
