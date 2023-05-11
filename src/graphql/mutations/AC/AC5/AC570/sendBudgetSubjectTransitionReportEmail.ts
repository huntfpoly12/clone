import gql from "graphql-tag";
export default gql`
    mutation sendBudgetSubjectTransitionReportEmail(
        $companyId: Int!,
        $fiscalYear: Int!,
        $facilityBusinessId: Int!,
        $transitionIds: [Int!]!,
        $emailInput: SendEmailRequestInput!
    ) {
        sendBudgetSubjectTransitionReportEmail(
            companyId: $companyId
            fiscalYear: $fiscalYear
            facilityBusinessId: $facilityBusinessId
            transitionIds: $transitionIds
            emailInput: $emailInput
        )
    }
`;
