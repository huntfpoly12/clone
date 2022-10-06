import gql from "graphql-tag";
export default gql`
mutation createSalesRepresentative(
    $data : SalesRepresentativeDetailInput!
  ) {
    createSalesRepresentative(
      input :  $data
     
    ){
      code
      status
  }
}
`