import gql from "graphql-tag";
export default gql`
  mutation createTaxWithholdingStatusReport(
    $companyId : Int!
    $key: TaxWithholdingStatusReportKeyInput!
    $input: TaxWithholdingStatusReportInput!
  ) {
    createTaxWithholdingStatusReport(
      companyId: $companyId
      key: $key
      input: $input
    ) {
        companyId,
        reportId
    }
  }
`;
