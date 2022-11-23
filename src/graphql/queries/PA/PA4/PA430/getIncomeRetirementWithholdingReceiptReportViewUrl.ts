import gql from "graphql-tag";
export default gql`
  query getIncomeRetirementWithholdingReceiptReportViewUrl($companyId: Int!) {
    getIncomeRetirementWithholdingReceiptReportViewUrl(companyId: $companyId) {
      employeeId
    }
  }
`;
