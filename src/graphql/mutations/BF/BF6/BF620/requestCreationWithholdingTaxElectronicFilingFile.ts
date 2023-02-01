import gql from "graphql-tag";
export default gql`
  mutation requestCreationLocalIncomeTaxElectronicFilingFile(
    $filter: ElectronicFilingWithholdingTaxSearchFilter!
    $emailInput: ReceiveEmailRequestInput!
    $reportKeyInputs: [ElectronicFilingReportKeyInput!]!
  ) {
    requestCreationLocalIncomeTaxElectronicFilingFile(
      filter: $filter
      emailInput: $emailInput
      reportKeyInputs: $reportKeyInputs
    )
  }
`;
