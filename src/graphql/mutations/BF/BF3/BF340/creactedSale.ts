import gql from "graphql-tag";
export default gql`
mutation createSalesRepresentative(
    $input : SalesRepresentativeDetailInput!
  ) {
    createSalesRepresentative(
      input :  $input
    ){
      code
      status
  }
}
`