import gql from "graphql-tag";
export default gql`
query getIncomProcessesInTaxWithholdingStatusReport($companyId: Int!, $reportId: Int!, $imputedYear: Int!) { 
    getIncomProcessesInTaxWithholdingStatusReport(companyId: $companyId, reportId: $reportId, imputedYear: $imputedYear) {
      companyId
      type
      imputedYear
      imputedMonth
      paymentYear
      paymentMonth
      status   
    }
  }
  `