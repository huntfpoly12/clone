import gql from "graphql-tag";
export default gql`mutation 
SendTaxWithholdingStatusReportEmail(
  $companyId: Int!
  $imputedYear: Int!
  $reportId: Int!
  $formInputs: [TaxWithholdingStatusReportFormInput!]!
  $emailInput: SendEmailRequestInput!
) {
  sendTaxWithholdingStatusReportEmail(
    companyId: $companyId
    imputedYear: $imputedYear
    reportId: $reportId
    formInputs: $formInputs
    emailInput: $emailInput
  )
}
`