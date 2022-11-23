import gql from "graphql-tag";
export default gql`
  mutation sendIncomeRetirementWithholdingReceiptReportEmail($companyId: Int!) {
    sendIncomeRetirementWithholdingReceiptReportEmail(companyId: $companyId) {
      employeeId
    }
  }
`;
