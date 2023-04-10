import gql from "graphql-tag";
export default gql`
  mutation updateTaxWithholdingStatusReport(
    $companyId : Int!
    $key: TaxWithholdingStatusReportKeyInput!
    $reportId: Int!
    $input: TaxWithholdingStatusReportInput!
  ) {
    updateTaxWithholdingStatusReport(
      companyId: $companyId
      key: $key
      reportId: $reportId
      input: $input
    ) {
        companyId,
        reportId
    }
  }
`;
