import gql from "graphql-tag";
export default gql`
    mutation createBacker($companyId: Int!, $input: BackerCreateInput!) {
        createBacker(companyId: $companyId, input: $input) {
            backerCode
            name
            type
            nonProfitCorpType
            otherContents
            fundrasingInstitution
            donationOrganization
            bizNumber
            roadAddress
            addressExtend
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
