import gql from "graphql-tag";
export default gql`
    mutation sendBudgetReportEmail(
        $companyId: Int!,
        $fiscalYear: Int!,
        $facilityBusinessId: Int!,
        $index: Int!,
        $type: Int!,
        $displayCode: Boolean!,
        $emailInput: SendEmailRequestInput!,
    ) {
        sendBudgetReportEmail(
            companyId: $companyId
            fiscalYear: $fiscalYear
            facilityBusinessId: $facilityBusinessId
            index: $index
            type: $type
            displayCode: $displayCode
            emailInput: $emailInput
        )
    }
`;
