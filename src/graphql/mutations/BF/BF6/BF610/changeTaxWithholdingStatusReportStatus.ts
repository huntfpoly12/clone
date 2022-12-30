import gql from "graphql-tag";
export default gql`
    mutation ChangeTaxWithholdingStatusReportStatus(
        $companyId: Int!
        $imputedYear: Int!
        $reportId: Int!
        $status: ProcessStatusScalar!
    ) {
        changeTaxWithholdingStatusReportStatus(
        companyId: $companyId
        imputedYear: $imputedYear
        reportId: $reportId
        status: $status
        ) {
        companyId
        }
    }
  
`
