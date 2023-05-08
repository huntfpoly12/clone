import gql from "graphql-tag";
export default gql`
    mutation sendBudgetSubjectTransitionReportEmail(
        $companyId: Int!,
        $fiscalYear: Int!,
        $facilityBusinessId: Int!,
        $transitionId: Int!,
        $emailInput: SendEmailRequestInput!
    ) {
        sendBudgetSubjectTransitionReportEmail(
            companyId: $companyId
            fiscalYear: $fiscalYear
            facilityBusinessId: $facilityBusinessId
            transitionId: $transitionId
            emailInput: $emailInput
        )
    }
`;
