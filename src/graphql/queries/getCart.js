import gql from "graphql-tag";
export default  gql`
query getCart {
  getCart {
    _id
    userId
    products {
      _id
      name
      price
      image
      description
      quantity
    }
  }
}
`