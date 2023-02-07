import gql from "graphql-tag";
export default gql`
    mutation ChangeIncomeProcessStatus(
        $companyId: Int!
        $type: Int!
        $processKey: IncomeProcessKeyInput!
        $status: ProcessStatusScalar!
    ) {
        changeIncomeProcessStatus(
        companyId: $companyId
        type: $type
        processKey: $processKey
        status: $status
        ) {
            companyId
        }
    }
`
