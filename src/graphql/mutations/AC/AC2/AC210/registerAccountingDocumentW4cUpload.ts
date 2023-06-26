import gql from "graphql-tag";
export default gql`
  mutation registerAccountingDocumentW4cUpload(
    $companyId: Int!
    $fiscalYear: Int!
    $year: Int!
    $month: Int!
  ) {
    registerAccountingDocumentW4cUpload(
        companyId: $companyId
        fiscalYear: $fiscalYear
        year: $year
        month: $month
    ) {
        requestId
    }
  }
`;
