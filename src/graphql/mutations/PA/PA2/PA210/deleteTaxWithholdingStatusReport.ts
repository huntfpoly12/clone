import gql from "graphql-tag";
export default gql`
  mutation deleteTaxWithholdingStatusReport(
    $companyId : Int!
    $imputedYear: Int!
    $reportId: Int!
  ) {
    deleteTaxWithholdingStatusReport(
      companyId: $companyId
      imputedYear: $imputedYear
      reportId: $reportId
    ) 
  }
`;
