import gql from "graphql-tag";
export default gql`
  query getIncomesForTaxWithholdingStatusReport(
    $companyId: Int!
    $input: IncomeTaxWithholdingStatusReportInput!
  ) {
    getIncomesForTaxWithholdingStatusReport( companyId: $companyId, input: $input ) {
      code
      numberOfPeople
      totalPayment
      collectedIncomeTax      
      }
    }
`;
