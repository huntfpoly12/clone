import gql from "graphql-tag";
export default gql`
    query getClient($companyId: Int!, $clientId: Int!) {
        getClient(companyId: $companyId, clientId: $clientId) {
            clientId
            name
            bizNumber
            presidentName
            phone
            use
            createdAt
            createdBy
            updatedAt
            updatedBy
            ip
            active
            residentId
        }
    }
`;
