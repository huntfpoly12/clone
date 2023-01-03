import gql from "graphql-tag";
export default gql`
query getTaxWithholdingStatusReportViewUrl(
  $companyId: Int!
  $imputedYear: Int!
  $reportId: Int!
  $formInputs: [TaxWithholdingStatusReportFormInput!]!
) {
  getTaxWithholdingStatusReportViewUrl(
    companyId: $companyId
    imputedYear: $imputedYear
    reportId: $reportId
    formInputs: $formInputs
  )
}`