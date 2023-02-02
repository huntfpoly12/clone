import gql from "graphql-tag";
export default gql`
  mutation requestCreationLocalIncomeTaxElectronicFilingFile(
    $filter: ElectronicFilingLocalIncomeTaxSearchFilter!
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
