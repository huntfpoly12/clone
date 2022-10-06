import gql from "graphql-tag";
export default gql`
query isSalesRepresentativeChangableName($id: Int!,$name: String!) {
    isSalesRepresentativeChangableName(id: $id,name: $name)
}
`
