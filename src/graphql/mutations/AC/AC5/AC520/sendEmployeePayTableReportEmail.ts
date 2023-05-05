import gql from "graphql-tag";
export default gql`
    mutation sendEmployeePayTableReportEmail(
        $companyId: Int!,
        $fiscalYear: Int!,
        $facilityBusinessId: Int!,
        $index: Int!,
        $emailInput: SendEmailRequestInput!,
    ) {
        sendEmployeePayTableReportEmail(
            companyId: $companyId
            fiscalYear: $fiscalYear
            facilityBusinessId: $facilityBusinessId
            index: $index
            emailInput: $emailInput
        )
    }
`;
