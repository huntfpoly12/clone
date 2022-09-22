import gql from "graphql-tag";
export default  gql`
query getOrders {
  getOrders {
    _id
    userId
    products {
      _id
      name
      price
      image
      description
      quantity
      date
    }
  }
}
`