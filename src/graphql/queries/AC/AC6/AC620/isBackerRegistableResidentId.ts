import gql from "graphql-tag";
export default gql`
    query isBackerRegistableResidentId($companyId: Int!, $residentId: String!) {
      isBackerRegistableResidentId(companyId: $companyId, residentId: $residentId)
    }
`;
