import gql from "graphql-tag";
export default gql`
  mutation requestCreationWithholdingTaxElectronicFilingFile(
    $filter: ElectronicFilingWithholdingTaxSearchFilter!
    $emailInput: ReceiveEmailRequestInput!
    $reportKeyInputs: [ElectronicFilingReportKeyInput!]!
  ) {
    requestCreationWithholdingTaxElectronicFilingFile(
      filter: $filter
      emailInput: $emailInput
      reportKeyInputs: $reportKeyInputs
    )
  }
`;
